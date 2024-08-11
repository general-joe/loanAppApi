import prisma from "../utils/prisma";
import { documents } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import {
  DocumentRequestDto,
  DocumentSchema,
} from "../validators/documentSchema";

export const createDocument = async (documentData: documents) => {
  try {
    const validatedDocument = DocumentSchema.safeParse(documentData);

    if (validatedDocument.success) {
      const { personId, ...restOfDocument } = documentData;
      if (personId) {
        const personExists = await prisma.person.findUnique({
          where: { id: personId },
        });
        if (!personExists) {
          throw new HttpException(HttpStatus.NOT_FOUND, "Person not found.");
        }
      }

      const newDocumnent = await prisma.documents.create({
        data: {
          ...restOfDocument,
          person: personId ? { connect: { id: personId } } : undefined,
        },
      });
      return newDocumnent as documents;
    } else {
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
  documentData: Partial<documents>
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

    const editDocumet = await prisma.documents.update({
      where: { id },
      data: {
        ...restDocumentData,
        person: personId ? { connect: { id: personId } } : undefined, // Only connect if personId is not null
      },
    });
  } catch (error) {}
};
export const deleteDocument = async (id: string) => {
  try {
    await prisma.documents.delete({ where: { id } });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(err.status || HttpStatus.BAD_REQUEST, err.message);
  }
};
