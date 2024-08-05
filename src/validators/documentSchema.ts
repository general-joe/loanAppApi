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
  id: z.string({ required_error: "ID is required" }).uuid("Invalid UUID format"),
  type: DocumentType,
  documentUrl: z
    .string({ required_error: "Document URL is required" })
    .url("Invalid URL format"),
  documentKey: z
    .string({ required_error: "Document key is required" })
    .min(1, "Document key cannot be empty"),
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