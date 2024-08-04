import { Request, Response, NextFunction } from "express";
import {
  makeBank,
  getBanks,
  getBankById,
  updateBank,
  deleteBank,
} from "../helpers/bankHelper";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { BankRequestDto } from "../validators/bankSchema";

export const savePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body satisfies BankRequestDto;

    const bank = await makeBank(data);
    res.status(HttpStatus.CREATED).json({ bank });
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

export const getAllBanks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const banks = await getBanks();
    res.status(HttpStatus.OK).json({ banks });
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

export const getBank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bank = await getBankById(id);
    res.status(HttpStatus.OK).json({ bank });
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

export const updateBankById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const bank = await updateBank(id, data);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Bank updated successfully", bank });
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

export const deleteBankById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bank = await deleteBank(id);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Bank deleted successfully", bank });
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
