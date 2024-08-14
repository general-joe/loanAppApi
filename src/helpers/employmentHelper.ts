import { employment } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {
  employmentSchema,
  employmentRecordsDto,
} from "../validators/employment.Schema";
import { ErrorResponse } from "../utils/types";

export const saveRecords = async (employmentData: employment) => {
  const validateRecords = employmentSchema.safeParse(employmentData);

  try {
    if (!validateRecords.success) {
      const errors = validateRecords.error.issues.map(
        ({ message, path }) => `${path.join(".")}: ${message}`
      );
      throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
    }

    const { personId, ...restOfEmploymentData } = employmentData;

    if (personId) {
      const personExists = await prisma.person.findUnique({
        where: { id: personId },
      });
      if (!personExists) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
      }
    }
    const Record = await prisma.employment.create({
      data: {
        ...restOfEmploymentData,
        person: personId ? { connect: { id: personId } } : undefined,
      },
    });
    return Record as employment;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getRecords = async () => {
  try {
    const records = await prisma.employment.findMany({
      include: {
        person: true,
      },
    });
    return records;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getRecordsById = async (id: string) => {
  try {
    const records = await prisma.employment.findUnique({
      where: {
        id,
      },
      include: {
        person: true,
      },
    });
    return records;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const updateRecords = async (
  id: string,
  employmentData: employmentRecordsDto
) => {
  try {
    const { personId, ...restEmploymentData } = employmentData;

    // Check if the person exists only if personId is provided and not null
    if (personId) {
      const personExists = await prisma.person.findUnique({
        where: { id: personId },
      });
      if (!personExists) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
      }
      const updateEmployment = await prisma.guarantor.update({
        where: {
          id: id,
        },
        data: {
          ...restEmploymentData,
          person: personId ? { connect: { id: personId } } : undefined, // Only connect if personId is not null
        },
      });
      return updateEmployment;
    }
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const deleteRecords = async (id: string) => {
  try {
    await prisma.employment.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
