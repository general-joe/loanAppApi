import { z } from "zod";

const schedule = z.enum(["FULL", "MONTHLY", "WEEKLY", "DAILY", "YEARLY"]);

export const CreditHistorySchema = z.object({
  previousLoan: z.boolean({ required_error: "Previous Loan is required" }),
  latePayments: z.boolean({ required_error: "Late payments is required" }),

  repaymentSchedule: schedule,

  personId: z.string().optional(),
});

export type CreditHistoryRequestDto = z.infer<typeof CreditHistorySchema>;
