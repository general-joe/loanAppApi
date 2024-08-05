import prisma from "../utils/prisma";
import { loan } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import { LoanRequestDto, LoanSchema } from "../validators/loanSchema";

export const requestLoan = async (loanData: loan) => {
  try {
    const validateLoandata = LoanSchema.safeParse(loanData);
    if (validateLoandata.success) {
      const newLoan = await prisma.loan.create({ data: { ...loanData } });
      return newLoan as loan;
    } else {
      const errors = validateLoandata.error.issues.map(
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

export const getAllLoans = async () => {
  try {
    const loans = await prisma.loan.findMany();
    return loans as loan[];
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getLoanById = async (id: string) => {
  try {
    const loan = await prisma.loan.findUnique({ where: { id } });
    return loan as loan;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const deleteLoan = async (id: string) => {
  try {
    const deletedLoan = await prisma.loan.delete({ where: { id } });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const updateLoan = async (id: string, loanData: loan) => {
  try {
    const updatedLoan = await prisma.loan.update({
      where: { id },
      data: { ...loanData },
    });
    return updatedLoan as loan;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
