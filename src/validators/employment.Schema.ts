import {z} from "zod"
const employmentType = z.enum([
    "FULLTIME",
    "PARTTIME",
    "CONTRACT",
    "SELFEMPLOYED"
])

export const employmentSchema = z.object({
    currentEmployerName: z.string({required_error: "Employee Name is required"})
    .trim()
    .min(1, "Employer name is required"),

    currentEmployerAddress: z.string({
        required_error: "Address cannot be empty"
    }).min(1, "Invalid Address"),

    position: z.string({
        required_error: "Position is required"
    }).min(1, "Employer name is required"),
    duration: z.number({
        required_error: "Number of duration is required"
    }).min(1, "negative number is not required"),
    type: employmentType,
    previousEmploymentDetails: z.string({
        required_error: "Previous Employment Details cannot be empty"
    }).min(1, "Details are required"),
    personId: z.string({
        required_error: "No person found"
    }).optional()

})

export type employmentRecordsDto = z.infer<typeof employmentSchema>;