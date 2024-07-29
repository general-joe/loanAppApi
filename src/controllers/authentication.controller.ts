import { Request, Response, NextFunction } from "express";
import speakeasy from "speakeasy";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { ErrorResponse } from "../utils/types";
import prisma from "../utils/prisma";
import { compare } from "../utils/bcrypt";

export const generateOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
const email: string = req.body.email;
const password: string = req.body.password;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(HttpStatus.FORBIDDEN).json({ message:"No user found" });
    }else{
        const isMatch = await compare(password, user.password);
    if (!isMatch)
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        "Invalid User Credentials"
      );
    }

    const secret = speakeasy.generateSecret({
      length: 25,
    }).base32

    const token = speakeasy.totp({
      secret,
      time: 30,
    }).toString();

    res.status(HttpStatus.OK).json({ secret, token});
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secret: string = req.body.secret
    const token: string = req.body.token
    const verified = speakeasy.totp.verify({
      secret: secret,
      token: token,
      window: 0,
    });
    if (!verified) {
      throw new HttpException(HttpStatus.FORBIDDEN, "Token is not valid");
    } else {
      res.status(HttpStatus.OK).json({ verified });
    }
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};