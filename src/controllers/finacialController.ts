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
import prisma from "../utils/prisma";

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

export const saveBulkFinancial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;

  // console.log(payload.creditHistoryPayload);
  // console.log("cccccccccccccccccxccccccccc");
  try {
    // const [currentFinancial, currentExpenses, creditHistory, publicRecords] =
    //   await Promise.all([
    //     prisma.financial.createMany({
    //       data: payload.currentFinancialPayloads,
    //     }),

    //     prisma.expenses.createMany({
    //       data: payload.currentExpensesPayloads,
    //     }),
    //     prisma.creditHistory.create({
    //       data: payload.creditHistoryPayload,
    //     }),
    //     prisma.publicRecords.create({
    //       data: payload.publicRecordsPayload,
    //     }),
    //   ]);

    await payload.currentFinancialPayloads.forEach((financial: any) => {
      prisma.financial.create({
        data: financial,
      });
    });
    await payload.currentExpensesPayloads.forEach((expenses: any) => {
      prisma.expenses.create({
        data: expenses,
      });
    });
    await prisma.creditHistory.create({
      data: {
        person: { connect: { id: payload.creditHistoryPayload.personId } },
        latePayments: payload.creditHistoryPayload.latePayments,
        repaymentSchedule: payload.creditHistoryPayload.repaymentSchedule,
        previousLoan: payload.creditHistoryPayload.previousLoan,
      },
    });

    await prisma.publicRecords.create({
      data: payload.publicRecordsPayload,
    });

    if (payload.currentDebtPayloads && payload.currentDebtPayloads.length > 0) {
      prisma.currentDebt.createMany({
        data: payload.currentDebtPayloads,
      });
    }
    res.status(HttpStatus.CREATED).json({
      created: "successfully",
    });
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
