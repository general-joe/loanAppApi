import prisma from "../utils/prisma";
import { publicRecords } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import {
  PublicRecordsRequestDto,
  PublicRecordsSchema,
} from "../validators/publicRecordSchema";
import { connect } from "http2";

export const createPublicRecord = async (publicRecordData: publicRecords) => {
  try {
    const validatePulicRecordData =
      PublicRecordsSchema.safeParse(publicRecordData);
    if (validatePulicRecordData.success) {
      const { personId ,...restPublicRecordData} = publicRecordData;

      // Check if the person exists only if personId is provided
      if (personId) {
        const personExists = await prisma.person.findUnique({
          where: { id: personId },
        });
        if (!personExists) {
          throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
        }
      }

      const publicRecord = await prisma.publicRecords.create({
        data: {
          ...restPublicRecordData, // Spread the rest of the public record data excluding personId
          person:personId ? {
            connect: { id: personId }, // Explicitly connecting the personId
          }:undefined
        },
      });
  
      return publicRecord as publicRecords;
    } else {
      const errors = validatePulicRecordData.error.issues.map(
        ({ message, path }) => `${path}: ${message}`
      );
      throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
    }
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getPublicRecords = async () => {
  try {
    const AllpublicRecords = await prisma.publicRecords.findMany({
      include: { person: true },
    });
    return AllpublicRecords as publicRecords[];
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getPublicRecordById = async (id: string) => {
  try {
    const publicRecord = await prisma.publicRecords.findUnique({
      where: { id },
      include: {
        person: true,
      },
    });
    return publicRecord as publicRecords;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const updatePublicRecord = async (
  id: string,
  publicRecordData: publicRecords
) => {
  try {
    const { personId, ...restPublicRecordData } = publicRecordData;

    // Check if the person exists only if personId is provided and not null
    if (personId) {
      const personExists = await prisma.person.findUnique({
        where: { id: personId },
      });
      if (!personExists) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
      }
    }

    // Update the public record and connect it to the person if personId is not null
    const updateRecord = await prisma.publicRecords.update({
      where: { id },
      data: {
        ...restPublicRecordData, // Spread the rest of the public record data excluding personId
        person: personId ? { connect: { id: personId } } : undefined, // Only connect if personId is not null
      },
    });

    return updateRecord;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
export const deletePublicRecord = async (id: string) => {
  try {
    await prisma.publicRecords.delete({ where: { id } });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
