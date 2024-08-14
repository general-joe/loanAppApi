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
import { employmentRecordsDto } from "../validators/employment.Schema";

export const saveEmploymentRecords = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const { data } = req.body satisfies employmentRecordsDto;
        const records = await saveRecords(data)
        res.status(HttpStatus.CREATED).json({ records });

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

export const getEmploymentRecords = async (req: Request, res: Response, next: NextFunction)=>{
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

export const getEmploymentRecordsById = async(req: Request, res: Response, next: NextFunction)=>{
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

export const updateEmploymentRecords = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const { id } = req.params
        const { data } = req.body
        const records = await updateRecords(id, data)
        res.status(HttpStatus.OK).json({message: "Employment Records updated successfully", records})

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

export const deleteEmploymentRecords  = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { id } = req.params
        const records = await deleteRecords(id)
        res.status(HttpStatus.OK).json({message: "Employment records deleted successfully", records})
        
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

