import {z} from "Zod"
const employmentType = z.enum([
    "FULLTIME",
    "PARTTIME",
    "CONTRACT",
    "SELFEMPLOYED"
])

export const employmentSchema = z.object({
    currentEmployerName: z.string(

        {required_error: "Employee Name is required"}
     
    ).trim(),

    currentEmployerAddress: z.string({
        required_error: "Address cannot be empty"
    }).min(1, "Invalid Address"),

    position: z.string({
        required_error: "Position is required"
    }),
    duration: z.number({
        required_error: "Number of duration is required"
    }).min(0, "negative number is not required"),
    type: employmentType,
    previousEmploymentDetails: z.string({
        required_error: "Previous Employment Details cannot be empty"
    }).min(1, "Details are required"),
    person: z.string({
        required_error: "No person found"
    }).optional()

})

export type employmentRecords = z.infer<typeof employmentSchema>;