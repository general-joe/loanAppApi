import { NextFunction, Request, Response } from "express";
import * as loanHelper from "../helpers/loanHelper";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { HttpStatus } from "../utils/http-status";
import { loan } from "@prisma/client";
import { LoanRequestDto } from "../validators/loanSchema";
export const requestLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loanData: LoanRequestDto = req.body satisfies LoanRequestDto;
    const newLoan = await loanHelper.requestLoan({...loanData });
    res.status(HttpStatus.CREATED).json(newLoan);
  } catch (error) {
    const err = error as ErrorResponse;
    next(
      new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};

export const getAllLoans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loans = await loanHelper.getAllLoans();
    res.status(HttpStatus.OK).json(loans);
  } catch (error) {
    const err = error as ErrorResponse;
    next(
      new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};

export const getLoanById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const loan = await loanHelper.getLoanById(id);
    res.status(HttpStatus.OK).json(loan);
  } catch (error) {
    const err = error as ErrorResponse;
    next(
      new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};

export const deleteLoandetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updateLoan = await loanHelper.deleteLoan(id);
    res
      .status(HttpStatus.NO_CONTENT)
      .json({ message: "loan details deleted successfully" });
  } catch (error) {
    const err = error as ErrorResponse;
    next(
      new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};

export const updateLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const loanData = req.body;
    const updatedLoan = await loanHelper.updateLoan(id, loanData);
    res.status(HttpStatus.CREATED).json(updatedLoan);
  } catch (error) {
    const err = error as ErrorResponse;
    next(
      new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};
