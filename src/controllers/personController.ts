import { Request, Response, NextFunction } from "express";
import {
  makePerson,
  getPersons,
  getPersonById,
  updatePerson,
  deletePerson,
} from "../helpers/personHelper";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { PersonRequestDto } from "../validators/personSchema";
import cloudinary from "../utils/cloudinary";

export const savePerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body satisfies PersonRequestDto;
    const photo = req.file ? req.file.path : undefined;
    const picture = {
      passportPictureUrlUrl: "",
      passportPictureKey: "",
    };
    if (photo) {
      const uploaded = await cloudinary.uploader.upload(photo, {
        folder: "persons/",
      });
      if (uploaded) {
        picture.passportPictureUrlUrl = uploaded.secure_url;
        picture.passportPictureKey = uploaded.public_id;
      }
    }
    data.dob = new Date(data.dob);
    data.noOfDependants = Number(data.noOfDependants);
    const person = await makePerson(data, picture);
    res.status(HttpStatus.CREATED).json({ person });
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

export const getAllPersons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const persons = await getPersons();
    res.status(HttpStatus.OK).json({ persons });
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

export const getSinglePerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const person = await getPersonById(id);
    res.status(HttpStatus.OK).json({ person });
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

export const updatePersonById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const person = await updatePerson(id, data);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Person updated successfully", person });
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

export const deletePersonById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const person = await deletePerson(id);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Person deleted successfully", person });
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
