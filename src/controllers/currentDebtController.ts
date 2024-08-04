import { Request, Response, NextFunction } from "express";
import {
  makeCurrentDebt,
  getCurrentDebts,
  getCurrentDebtById,
  updateCurrentDebt,
  deleteCurrentDebt,
} from "../helpers/currentDebtHelper";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { CurrentDebtRequestDto } from "../validators/currentDebtSchema";

export const saveCurrentDebt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body satisfies CurrentDebtRequestDto;

    const currentDebt = await makeCurrentDebt(data);
    res.status(HttpStatus.CREATED).json({ currentDebt });
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

export const getAllCurrentDebts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentDebts = await getCurrentDebts();
    res.status(HttpStatus.OK).json({ currentDebts });
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

export const getCurrentDebt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentDebt = await getCurrentDebtById(id);
    res.status(HttpStatus.OK).json({ currentDebt });
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

export const updateCurrentDebtById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const currentDebt = await updateCurrentDebt(id, data);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Current debt updated successfully", currentDebt });
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

export const deleteCurrentDebtById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentDebt = await deleteCurrentDebt(id);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Current debt deleted successfully", currentDebt });
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
