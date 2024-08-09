import { NextFunction, Request, Response } from "express";
import * as creditHistoryHelper from "../helpers/creditHistoryHelper";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { HttpStatus } from "../utils/http-status";
import { CreditHistoryRequestDto } from "../validators/creditHistorySchema";
import { creditHistory } from "@prisma/client";

export const addCreditHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creditHistoryData: CreditHistoryRequestDto = req.body;
    const newCreditHistory = await creditHistoryHelper.createCreditHistory(creditHistoryData);
    res
      .status(HttpStatus.OK)
      .send({ message: "Credit history added successfully", newCreditHistory });
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

export const updateCreditHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creditHistoryId = req.params.id;
    const creditHistoryData: creditHistory = req.body;
    const updatedCreditHistory = await creditHistoryHelper.updateCreditHistory(
      creditHistoryId,
      creditHistoryData
    );
    res.status(HttpStatus.OK).json(updatedCreditHistory);
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

export const getCreditHistoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creditHistoryId = req.params.id;
    const creditHistory = await creditHistoryHelper.getCreditHistoryById(creditHistoryId);
    res.status(HttpStatus.OK).json(creditHistory);
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

export const getCreditHistories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creditHistories = await creditHistoryHelper.getCreditHistory();
    res.status(HttpStatus.OK).json(creditHistories);
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

export const deleteCreditHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creditHistoryId = req.params.id;
    await creditHistoryHelper.deleteCreditHistory(creditHistoryId);
    res.status(HttpStatus.NO_CONTENT).json("Successfully deleted");
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
