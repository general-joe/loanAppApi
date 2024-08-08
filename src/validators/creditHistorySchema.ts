import { z } from "zod";

export const CreditHistorySchema = z.object({
  id: z.string({ required_error: "ID is required" }).uuid("Invalid UUID format").optional(),
  detailsOfPreviousLoans: z
    .string({ required_error: "Details of previous loans are required" })
    .trim()
    .min(1, "Details of previous loans cannot be empty"),
  repaymentHistory: z
    .string({ required_error: "Repayment history is required" })
    .trim()
    .min(1, "Repayment history cannot be empty"),
  latePayments: z
    .string({ required_error: "Late payments information is required" })
    .trim()
    .min(1, "Late payments information cannot be empty"),
  personId: z.string().uuid("Invalid UUID format").optional(),
  person: z
    .object({
      id: z.string().uuid(),
      fullName: z.string(),
      email: z.string().email()
    })
    .optional()
});

export type CreditHistoryRequestDto = z.infer<typeof CreditHistorySchema>;
