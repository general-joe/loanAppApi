import { Request, Response, NextFunction, response, request } from "express";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import {
    saveRecords,
    getRecords,
    getRecordsById,
    updateRecords,
    deleteRecords
} from "../helpers/employmentHelper"
import { guarantorRecords,guarantorSchema } from "../validators/guarantor.Schema";
import { guarantor } from "@prisma/client";

export const saveGuarantorRecords = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const guarantorData  = req.body  satisfies guarantorRecords
        const records = await saveRecords(guarantorData)
        res.status(HttpStatus.CREATED).json(records );

    }catch (error) {
    const err = error as ErrorResponse;
    next(
      new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
    
};

export const getGuarantorRecords = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const records = await getRecords()
        res.status(HttpStatus.OK).json({records})
      
       }  catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};

export const getGuarantorRecordsById = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { id } = req.params
        const records = await getRecordsById(id)
        res.status(HttpStatus.OK).json({records})
    } catch (error) {
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
        
    }
};

export const updateGuarantorRecords = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const { id } = req.params
        const { data } = req.body
        const records = await updateRecords(id, data)
        res.status(HttpStatus.OK).json({message: "Guarantor Records updated successfully", records})

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )

    }
};

export const deleteGuarantorRecords  = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { id } = req.params
        const records = await deleteRecords(id)
        res.status(HttpStatus.OK).json({message: "Guarantor records deleted successfully", records})
        
    } catch (error) {
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
        
    }
};

