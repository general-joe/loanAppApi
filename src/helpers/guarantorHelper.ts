import { guarantor } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {
  guarantorSchema,
  guarantorRecords,
} from "../validators/guarantor.Schema";
import { ErrorResponse } from "../utils/types";

export const saveRecords = async (guarandatorData: guarantor) => {
  try {
    const validateGuarantor = guarantorSchema.safeParse(guarandatorData);
    if (!validateGuarantor.success) {
      const errors = validateGuarantor.error.issues.map(
        ({ message, path }) => `${path.join(".")}: ${message}`
      );
      throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    const { personId, ...restOfguarandatorData } = guarandatorData;

    if (personId) {
      const personExists = await prisma.person.findUnique({
        where: { id: personId },
      });
      if (!personExists) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
      }
    }

    const guarantor = await prisma.guarantor.create({
      data: {
        ...restOfguarandatorData,
        person: personId ? { connect: { id: personId } } : undefined, // Only connect if personId is not null
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

export const getRecords = async () => {
  try {
    const guarantor = await prisma.guarantor.findMany({
      include: {
        person: true,
      },
    });
    return guarantor;
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
    const guarantor = await prisma.guarantor.findUnique({
      where: {
        id,
      },
      include: {
        person: true,
      },
    });
    return guarantor;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const updateRecords = async (id: string, data: guarantorRecords) => {
  try {
    const guarantor = await prisma.guarantor.update({
      where: {
        id: id,
      },
      data: {
        fullname: data.fullname,
        address: data.address,
        telephone: data.telephone,
        relationship: data.relationship,
        person: {
          connect: {
            id: data.person,
          },
        },
      },
    });
    return guarantor;
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
    const guarantor = await prisma.guarantor.delete({
      where: {
        id: id,
      },
    });
    return guarantor;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
