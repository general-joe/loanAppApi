import { z } from "zod";

const DocumentType = z.enum([
  "PASSPORT",
  "NATIONALID",
  "DRIVERLICENSE",
  "UTITLITYBILL",
  "LEASEAGREEMENT",
  "TAXRETURNS",
  "BANKSTATMENT",
  "CREDITREPORT",
  "RECENTPAYSTUBS"
]);

export const DocumentSchema = z.object({

  type: DocumentType,

  personId: z.string().uuid("Invalid UUID format").optional(),
  person: z
    .object({
      id: z.string().uuid(),
      fullName: z.string(),
      email: z.string().email()
    })
    .optional()
});

export type DocumentRequestDto = z.infer<typeof DocumentSchema>;