import { NextFunction, Request, Response } from "express";
import * as publicRecordHelper from "../helpers/publicRecordHelper";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { HttpStatus } from "../utils/http-status";
import { publicRecords } from "@prisma/client";
import { PublicRecordsRequestDto } from "../validators/publicRecordSchema";
import prisma from "../utils/prisma";

export const addPublicRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const publicRecordData: publicRecords =
      req.body satisfies PublicRecordsRequestDto;
    const addRecord = await publicRecordHelper.createPublicRecord(
      publicRecordData
    );
    res.status(HttpStatus.CREATED).json(addRecord);
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

export const getPublicRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allRecords = await publicRecordHelper.getPublicRecords();
    res.status(HttpStatus.OK).json(allRecords);
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

export const updatePublicRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const recordData: publicRecords = req.body;
    const updatedRecord = await publicRecordHelper.updatePublicRecord(
      id,
      recordData
    );
    res.status(HttpStatus.CREATED).json(updatedRecord);
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

export const getRecordById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const record = await publicRecordHelper.getPublicRecordById(id);
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


export const deleteRecord=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params.id
        await publicRecordHelper.deletePublicRecord(id)
        res.status(HttpStatus.NO_CONTENT).json("successfully deleted")
    } catch (error) {
        const err=error as ErrorResponse
        next(new HttpException(err.status||HttpStatus.INTERNAL_SERVER_ERROR,err.message))
    }
}