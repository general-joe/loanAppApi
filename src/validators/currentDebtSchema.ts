import { z } from "zod";
const loanType = z.enum([
  "PERSONAL",
  "AUTO",
  "MORTGAGE",
  "STUDENT",
  "COOPERATE",
  "BUSINESS",
]);

export const CurrentDebtSchema = z.object({
  loanAmount: z
    .number({ required_error: "Loan amount is required" })
    .min(0, "Loan amount cannot be negative"),
  existingLoanType: loanType,
  outstandingBalance: z
    .number({ required_error: "Outstanding balance is required" })
    .min(0, "Outstanding balance cannot be negative"),
  monthlyPaymentObligations: z
    .number({ required_error: "Monthly payment obligation is required" })
    .min(0, "Monthly payment obligations cannot be negative"),
  personId: z.string().optional(),
});

export type CurrentDebtRequestDto = z.infer<typeof CurrentDebtSchema>;
