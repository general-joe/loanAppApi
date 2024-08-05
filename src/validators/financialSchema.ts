import { z } from "zod";

const incomeType = z.enum(["WAGES", "SALARY", "BONUSES", "OTHERS"]);

export const FinancialSchema = z.object({
  type: incomeType,
  amount: z
    .number({ required_error: "Amount is required" })
    .min(0, "Amount can not be negative"),
  personId: z.string().optional(),
});

export type FinancialRequestDto = z.infer<typeof FinancialSchema>;
