// src/validators/publicRecordsValidator.ts
import { z } from "zod";

export const PublicRecordsSchema = z.object({
  id: z.string({ required_error: "ID is required" }).uuid("Invalid UUID format").optional(),
  bankruptcies: z.boolean({ required_error: "Bankruptcies status is required" }),
  criminalRecord: z.boolean({ required_error: "Criminal record status is required" }),
  nationality: z
    .string({ required_error: "Nationality is required" })
    .trim()
    .min(1, "Nationality cannot be empty"),
  personId: z.string().uuid("Invalid UUID format").optional(),
  person: z
    .object({
      id: z.string().uuid(),
      fullName: z.string(),
      email: z.string().email()
    })
    .optional()
});

export type PublicRecordsRequestDto = z.infer<typeof PublicRecordsSchema>;
