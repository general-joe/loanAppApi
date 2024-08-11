import prisma from "../utils/prisma";
import * as bcrypt from "../utils/bcrypt";
import { UserRequestDto, UserSchema } from "../validators/userSchema";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import { generateOtp, sendOtpEmail } from "./otpHelper";
interface UserData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  company: string;
  otp?: string; // Optional OTP field
  isVerified?: boolean; // User verification status
  createdAt?: Date;
  updatedAt?: Date;
}

export const createUser = async (userData: UserRequestDto) => {
  const validateUser = UserSchema.safeParse(userData);
  if (!validateUser.success) {
    const errors = validateUser.error.issues.map(
      ({ message, path }) => `${path}: ${message}`
    );
    throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
  }

  const { email, fullName, password, company } = userData;

  const findUser = await prisma.user.findUnique({ where: { email } });
  if (findUser) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "User Already exist");
  }

  const hashedpsswd = await bcrypt.hash(userData.password);
  if (!hashedpsswd) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Password hashing failed"
    );
  }

  const otp = generateOtp(); // Generate the OTP

  try {
    // Send OTP email
    await sendOtpEmail(email, otp);

    // If OTP sent successfully, create the user
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedpsswd,
        otp, // Save the OTP with the user
      },
    });

    return newUser as UserData;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message || "Failed to create user"
    );
  }
};



export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user as UserData | null;
  } catch (error) {
    console.error("Error fetching user by email", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users as UserData[];
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(err.status || HttpStatus.BAD_REQUEST, err.message);
  }
};

export const updateUser = async (
  userId: string,
  userData: Partial<UserData>
) => {
  try {
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { ...userData },
    });
    return updateUser as UserData;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      err.message || "Failed to update user"
    );
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(err.status || HttpStatus.BAD_REQUEST, err.message);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user as UserData | null;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new HttpException(err.status || HttpStatus.BAD_REQUEST, err.message);
  }
};
