import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import * as userHelper from "../helpers/userhelper";
import * as bcrypt from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../utils/http-status";
import { UserRequestDto } from "../validators/userSchema";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import { UserPayload, setInvalidToken, signToken } from "../utils/jsonwebtoken";
import cloudinary from "../utils/cloudinary";


interface UserData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  company: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: UserData = req.body satisfies UserRequestDto;
    //make sure u check whether the user already exists, if not create

    const newUser = await userHelper.createUser({ ...userData });
    const { password, ...user } = newUser;
    res.status(HttpStatus.CREATED).json({
      newUser,
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

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData: { email: string; password: string } = req.body;
  if (!userData.email || !userData.password) {
    throw new HttpException(
      HttpStatus.BAD_REQUEST,
      "Please provide all fields"
    );
  }
  try {
    const user = await userHelper.getUserByEmail(userData.email);

    if (!user)
      throw new HttpException(HttpStatus.NOT_FOUND, "User Does not Exist");

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch)
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        "Invalid User Credentials"
      );

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

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  const token = authHeader?.split(" ")[1];
  if (token) {
    const decoded = jwtDecode(token) as UserPayload;
    const user = await userHelper.getUserById(decoded?.id);
    if (user) {
      res.status(HttpStatus.OK).json({ user });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    }
  } else {
    res.status(HttpStatus.FORBIDDEN).json({ message: "No token found" });
  }
};
export const logout = async (req: Request, res: Response) => {
  await setInvalidToken();
  res.status(HttpStatus.OK).json({ message: "Logout successful" });
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userHelper.getAllUsers();
    res.status(HttpStatus.OK).json({ users });
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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const data = req.body satisfies UserRequestDto;
    const photo = req.file ? req.file.path : undefined;

    if (photo) {
      const uploaded = await cloudinary.uploader.upload(photo, {
        folder: "profile/",
      });
      if (uploaded) {
        data.photoUrl = uploaded.secure_url;
        data.photoKey = uploaded.public_id;
      }
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password);
    }
    const updatedUser = await userHelper.updateUser(userId, userData);
    res.status(HttpStatus.CREATED).json(updatedUser);
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

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    await userHelper.deleteUser(userId);
    res
      .status(HttpStatus.NO_CONTENT)
      .json({ message: "User deleted successfully" });
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

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    const user = await userHelper.getUserById(userId);
    if (user) {
      res.status(HttpStatus.OK).json(user);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
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
