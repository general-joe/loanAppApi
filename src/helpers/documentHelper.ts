import prisma from "../utils/prisma";
import { documents } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import {
  DocumentRequestDto,
  DocumentSchema,
} from "../validators/documentSchema";
import cloudinary from "../utils/cloudinary";

export const createDocument = async (documentData: documents,picture: { documentUrl: string;documentKey: string }) => {
  try {
    const validatedDocument = DocumentSchema.safeParse(documentData);

    if (!validatedDocument.success) {
      const errors = validatedDocument.error.issues.map(
        ({ message, path }) => `${path.join('.')}: ${message}`
      );
      throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
    }

    const { personId, ...restOfDocument } = documentData;
    
    if (personId) {
      const personExists = await prisma.person.findUnique({
        where: { id: personId },
      });
      if (!personExists) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
      }
    }

    const newDocument = await prisma.documents.create({
      data: {
        ...restOfDocument, documentUrl: picture.documentUrl,
        documentKey: picture.documentKey,
        person: personId ? { connect: { id: personId } } : undefined,
      },
    });
    return newDocument as documents;
  } catch (error) {
    const err = error as ErrorResponse;

    // Handle Prisma errors or other errors more explicitly if needed
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || "An unexpected error occurred.";

    throw new HttpException(status, message);
  }
};

export const getDocuments = async () => {
  try {
    const Documents = await prisma.documents.findMany({
      include: { person: true },
    });
    return Documents as documents[];
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const getDocumentById = async (id: string) => {
  try {
    const document = await prisma.documents.findUnique({
      where: { id },
      include: { person: true },
    });
    return document as documents;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const updateDocument = async (
  id: string,
  documentData:documents,
  picture?: { documentUrl: string; documentKey: string }
) => {
  try {
    const { personId, ...restDocumentData } = documentData;

    // Check if the person exists only if personId is provided and not null
    if (personId) {
      const personExists = await prisma.person.findUnique({
        where: { id: personId },
      });
      if (!personExists) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
      }
    }

    // Handle image update
    if (picture) {
      // Retrieve existing document to delete the old image if needed
      const existingDocument = await prisma.documents.findUnique({
        where: { id },
      });

      if (existingDocument?.documentKey) {
        await cloudinary.uploader.destroy(existingDocument.documentKey);
      }

      // Include the new image data in the update
      restDocumentData.documentUrl = picture.documentUrl;
      restDocumentData.documentKey = picture.documentKey;
    }

    const updatedDocument = await prisma.documents.update({
      where: { id },
      data: {
        ...restDocumentData,
        person: personId ? { connect: { id: personId } } : undefined, // Only connect if personId is not null
      },
    });

    return updatedDocument;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
export const deleteDocument = async (id: string) => {
  try {
    await prisma.documents.delete({ where: { id } });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(err.status || HttpStatus.BAD_REQUEST, err.message);
  }
};
