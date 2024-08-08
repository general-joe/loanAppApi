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
