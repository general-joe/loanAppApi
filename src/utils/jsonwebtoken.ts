import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "./http-status";

export interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: "Invalid token" });
      }
      req.user = user as UserPayload;
      next();
    });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({ message: "No token found" });
  }
};

export const signToken = (payload: UserPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const setInvalidToken = () =>
  jwt.sign({ logout: "logout" }, process.env.JWT_SECRET as string, {
    expiresIn: 30,
  });

export default authenticateJWT;
