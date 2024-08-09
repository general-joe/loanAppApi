import { creditHistory } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {
  CreditHistoryRequestDto,
  CreditHistorySchema,
} from "../validators/creditHistorySchema";
import { ErrorResponse } from "../utils/types";

export const createCreditHistory = async (
  creditHistoryData: CreditHistoryRequestDto
) => {
  try {
    // Validate incoming data using Zod schema
    const validateCreditHistory =
      CreditHistorySchema.safeParse(creditHistoryData);
    if (validateCreditHistory.success) {
      const { personId, ...restData } = creditHistoryData;

      // Check if the person exists only if personId is provided
      if (personId) {
        const personExists = await prisma.person.findUnique({
          where: { id: personId },
        });
        if (!personExists) {
          throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
        }
      }

      // All checks passed, proceed to create the credit history
      return await prisma.creditHistory.create({
        data: {
          ...restData,
          person: personId ? { connect: { id: personId } } : undefined,
        },
      });
    } else {
      const errors = validateCreditHistory.error.issues.map(
        ({ message, path }) => `${path.join(".")}: ${message}`
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

// Get Credit History
export const getCreditHistory = async () => {
  try {
    const credit = await prisma.creditHistory.findMany();
    return credit as creditHistory[];
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getCreditHistoryById = async (id: string) => {
  try {
    const creditHis = await prisma.creditHistory.findUnique({ where: { id } });
    return creditHis as creditHistory;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const updateCreditHistory = async (
  id: string,
  creditData: creditHistory
) => {
  try {
    const updated = await prisma.creditHistory.update({
      where: { id },
      data: { ...creditData },
    });
    return updated as creditHistory;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const deleteCreditHistory = async (id: string) => {
  try {
    await prisma.creditHistory.delete({ where: { id } });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

