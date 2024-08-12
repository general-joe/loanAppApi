import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import HttpException from "./http-error";
import { HttpStatus } from "./http-status";

// Define a UserPayload interface to ensure strong typing
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

// Middleware to authenticate JWT tokens
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return next(
          new HttpException(HttpStatus.FORBIDDEN, "Invalid token")
        );
      }
      req.user = decoded as UserPayload; // Attach user data to the request
      next();
    });
  } else {
    next(new HttpException(HttpStatus.FORBIDDEN, "No token found"));
  }
};

// Function to sign a JWT token with the user payload
export const signToken = (payload: UserPayload): string => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT configuration is missing"
    );
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to create a short-lived invalidation token
export const setInvalidToken = (): string => {
  if (!process.env.JWT_SECRET) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT secret is missing"
    );
  }
  return jwt.sign({ logout: "logout" }, process.env.JWT_SECRET, {
    expiresIn: "30s", // Short-lived token
  });
};


