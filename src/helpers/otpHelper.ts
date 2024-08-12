import nodemailer from "nodemailer";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { signToken } from "../utils/jsonwebtoken";
// Helper function to generate a 6-digit OTP
export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  // Helper function to send OTP via email
  export const sendOtpEmail = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP email sent successfully");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new HttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to send OTP email"
      );
    }
  };
  export const verifyOtp = async (email: string, otp: string) => {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid OTP or User not found");
    }
  
    // Check if the OTP matches
    if (user.otp !== otp) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid OTP");
    }
  
    // Generate a JWT token if OTP is correct
    const token = signToken({ id: user.id });
  
    // Clear the OTP from the database after successful verification
    await prisma.user.update({
      where: { email },
      data: { otp: null },
    });
  
    return token;
  };