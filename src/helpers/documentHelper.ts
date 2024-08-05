import prisma from "../utils/prisma";
import { documents } from '@prisma/client';
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import { DocumentRequestDto, DocumentSchema } from "../validators/documentSchema";

export const createDocument = async (documentData: documents) => {
    try {
        const validatedDocument = DocumentSchema.safeParse(documentData);
    
    if (validatedDocument.success) {
      const newDocumnent=await prisma.documents.create({data:{...documentData}})
        return newDocumnent as documents
    }else {
        const errors = validatedDocument.error.issues.map(
          ({ message, path }) => `${path}: ${message}`
        );
        throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
      }
    } catch (error) {
        const err = error as ErrorResponse;
        throw new HttpException(
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          err.message
        );
      }
}

export const getDocuments=async()=>{
    try {
        const Documents=await prisma.documents.findMany();
        return Documents as documents[]
    } catch (error) {
        const err = error as ErrorResponse;
        throw new HttpException(
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          err.message
        );
      }
}

export const getDocumentById=async(id:string)=>{
    try {
        const document=await prisma.documents.findUnique({where:{id}})
        return document as documents 
    } catch (error) {
        const err = error as ErrorResponse;
        throw new HttpException(
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          err.message
        );
      }
}


export const updateDocument=async(id:string,documentData:Partial<documents>)=>{
  try {
    const editDocumet= await prisma.documents.update({where:{id},data:{...documentData}})
    return editDocumet as documents
  } catch (error) {
    
  }
}
export const deleteDocument=async(id:string)=>{
    try {
        await prisma.documents.delete({where:{id}})
    } catch (error) {
        const err = error as ErrorResponse;
        throw new HttpException(err.status || HttpStatus.BAD_REQUEST, err.message);
      }
    };