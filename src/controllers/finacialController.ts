import { Request, Response, NextFunction } from "express";
import {
  makeFinancial,
  getFinancials,
  getFinancialById,
  updateFinancial,
  deleteFinancial,
} from "../helpers/financialHelper";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { FinancialRequestDto } from "../validators/financialSchema";

export const saveFinancial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body satisfies FinancialRequestDto;
    data.amount = Number(data.amount);

    const financial = await makeFinancial(data);
    res.status(HttpStatus.CREATED).json({ financial });
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

export const getAllFinancials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const financial = await getFinancials();
    res.status(HttpStatus.OK).json({ financial });
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

export const getSingleFinancial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const financial = await getFinancialById(id);
    res.status(HttpStatus.OK).json({ financial });
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

export const updateFinancialById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const financial = await updateFinancial(id, data);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Financial updated successfully", financial });
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

export const deleteFinancialById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const financial = await deleteFinancial(id);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Financial deleted successfully", financial });
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
