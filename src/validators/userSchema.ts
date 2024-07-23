import { z } from "zod";

// Enum for Status
const Status = z.enum(["ACTIVE", "BLOCKED", "INACTIVE", "REMOVED"]);

export const UserSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name is required"),
  last_name: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(1, "Last name is required"),
  phoneNumber: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(1, "Phone number is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

export type UserRequestDto = z.infer<typeof UserSchema>;
