// src/validators/loanValidator.ts
import { z } from "zod";

const LoanType = z.enum([
  "PERSONAL",
  "AUTO",
  "MORTGAGE",
  "STUDENT",
  "COOPERATE",
  "BUSINESS",
]);

export const LoanSchema = z.object({
  loanAmountRequested: z
    .number({ required_error: "Loan amount requested is required" })
    .positive("Loan amount must be a positive number"),
  type: LoanType,
  purpose: z
    .string({ required_error: "Purpose is required" })
    .trim()
    .min(1, "Purpose is required"),
  loanTerm: z
    .number({ required_error: "Loan term is required" })
    .int("Loan term must be an integer")
    .positive("Loan term must be a positive number"),
  collateral: z
    .string({ required_error: "Collateral is required" })
    .trim()
    .min(1, "Collateral is required"),
  personId: z.string({ required_error: "Person ID is required" }).uuid("Invalid UUID format").optional()
});

export type LoanRequestDto = z.infer<typeof LoanSchema>;
