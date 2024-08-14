import { NextFunction, Request, Response } from "express";
import * as documentHelper from "../helpers/documentHelper";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { HttpStatus } from "../utils/http-status";
import { documents } from "@prisma/client";
import { DocumentRequestDto } from "../validators/documentSchema";
import cloudinary from "../utils/cloudinary";

export const addDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentData: documents = req.body satisfies DocumentRequestDto;
    const photo = req.file ? req.file.path : undefined;
    const picture = {
      documentUrl: "",
      documentKey: "",
    };
    if (photo) {
      const uploaded = await cloudinary.uploader.upload(photo, {
        folder: "document/",
      });
      if (uploaded) {
        picture.documentUrl = uploaded.secure_url;
        picture.documentKey = uploaded.public_id;
      }
      const newDocumnent = await documentHelper.createDocument(documentData,picture);
      res
        .status(HttpStatus.OK)
        .send({ message: "document added successfully", newDocumnent });
    }
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

export const updateDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.params.id;
    const documentData: documents = req.body;
    const editDocument = await documentHelper.updateDocument(
      documentId,
      documentData
    );
    res.status(HttpStatus.OK).json(editDocument);
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

export const getDocumentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.params.id;
    const document = await documentHelper.getDocumentById(documentId);
    res.status(HttpStatus.OK).json(document);
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

export const getDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documents = await documentHelper.getDocuments();
    res.status(HttpStatus.OK).json(documents);
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

export const deleteDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.params.id;
    const deletedDocument = await documentHelper.deleteDocument(documentId);
    res.status(HttpStatus.NO_CONTENT).json("successfully deleted");
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
