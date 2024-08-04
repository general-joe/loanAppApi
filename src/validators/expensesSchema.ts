import { z } from "zod";

const expenseType = z.enum([
  "UTILITIES",
  "GROCERIES",
  "TRANSPORTATION",
  "INSURANCES",
  "OTHERS",
]);

export const ExpensesSchema = z.object({
  type: expenseType,
  amount: z
    .number({ required_error: "Amount is required" })
    .min(0, "Amount can not be negative"),
  personId: z.string().optional(),
});

export type ExpensesRequestDto = z.infer<typeof ExpensesSchema>;
