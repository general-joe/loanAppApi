import prisma from "../utils/prisma";
import { publicRecords } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import {
  PublicRecordsRequestDto,
  PublicRecordsSchema,
} from "../validators/publicRecordSchema";

export const createPublicRecord = async (publicRecordData: publicRecords) => {
  try {
    const validatePulicRecordData =
      PublicRecordsSchema.safeParse(publicRecordData);
    if (validatePulicRecordData.success) {
      const publicRecord = await prisma.publicRecords.create({
        data: { ...publicRecordData },
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
    const updateRecord = await prisma.publicRecords.update({
      where: { id },
      data: { ...publicRecordData },
    });
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
