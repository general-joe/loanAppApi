import {z} from "Zod"


export const guarantorSchema = z.object({
    fullname: z.string(

        {required_error: "Name is required"}
     
    ).trim(),

    address: z.string({
        required_error: "Address cannot be empty"
    }).min(1, "Invalid Address"),

    telephone: z.string({
        required_error: "contact is required"
    }).min(10, "number must be 10"). max(10,  "number must be 10"),
    
    relationship: z.string({
        required_error: "provide relationship"
    }).min(1, "relationship is required"),
    person: z.string({
        required_error: "No person found"
    }).optional()

})

export type guarantorRecords = z.infer<typeof guarantorSchema>;