import { z } from "zod";
const accountType = z.enum([
  "SAVINGS",
  "CURRENT",
  "COOPERATE",
  "SUSU",
  "FIXEDDEPOSIT",
  "TBILL",
  "BONDS",
]);

export const BankSchema = z.object({
  accountNumber: z
    .string({ required_error: "Account number is required" })
    .trim()
    .min(1, "Account number is required"),
  accountName: z
    .string({ required_error: "Account name is required" })
    .trim()
    .min(1, "Account name is required"),

  bankName: z
    .string({ required_error: "Bank name is required" })
    .trim()
    .min(1, "Bank name is required"),
  type: accountType,
  balance: z
    .number({ required_error: "Balance is required" })
    .min(0, "Balance can not be negative"),
  personId: z.string().optional(),
});

export type BankRequestDto = z.infer<typeof BankSchema>;
