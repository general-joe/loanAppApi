import { Request, Response, NextFunction } from "express";
import {
  makeExpenses,
  getExpenses,
  getExpensestById,
  updateExpenses,
  deleteExpenses,
} from "../helpers/expensesHelper";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { ExpensesRequestDto } from "../validators/expensesSchema";

export const saveExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body satisfies ExpensesRequestDto;
    data.amount = Number(data.amount);
    const expenses = await makeExpenses(data);
    res.status(HttpStatus.CREATED).json({ expenses });
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

export const getAllExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenses = await getExpenses();
    res.status(HttpStatus.OK).json({ expenses });
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

export const getSingleExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const expenses = await getExpensestById(id);
    res.status(HttpStatus.OK).json({ expenses });
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

export const updateExpensesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const expenses = await updateExpenses(id, data);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Expenses updated successfully", expenses });
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

export const deleteExpensesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const expenses = await deleteExpenses(id);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Expenses deleted successfully", expenses });
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
