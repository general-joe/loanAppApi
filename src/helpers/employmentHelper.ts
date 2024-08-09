import prisma from "../utils/prisma";
import { employmentSchema, employmentRecords } from "../validators/emploment.Schema";

export const saveRecords = async(data: employmentRecords)=>{
    const validateRecords = employmentSchema.safeParse(data) 
    if(validateRecords.success){
        const records = await prisma.employment.create({
            data: {
                currentEmployerName: validateRecords.data.currentEmployerName,
                currentEmployerAddress: validateRecords.data.currentEmployerAddress,
                position: validateRecords.data.position,
                duration: validateRecords.data.duration,
                type: validateRecords.data.type,
                previousEmploymentDetails: validateRecords.data.previousEmploymentDetails,
                person: {
                    connect: {
                        id: validateRecords.data.person
                    }
                }
            }
        })
        return records
    }
    
}


export const getRecords = async()=>{
    const records = await prisma.employment.findMany({
        include: {
            person: true
        }
    })
    return records
}


export const getRecordsById = async(id: string)=>{
    const records = await prisma.employment.findUnique({
        where: {
            id
        },
        include: {
            person: true
        }
    })
    return records
}

export const updateRecords = async(id: string, data: employmentRecords )=>{
    const validateRecords = employmentSchema.safeParse(data) 
    if(validateRecords.success){
        const records = await prisma.employment.update({
            where: {
                id: id
            },
            data: {
                currentEmployerName: validateRecords.data.currentEmployerName,
                currentEmployerAddress: validateRecords.data.currentEmployerAddress,
                position: validateRecords.data.position,
                duration: validateRecords.data.duration,
                type: validateRecords.data.type,
                previousEmploymentDetails: validateRecords.data.previousEmploymentDetails,
                person: {
                    connect: {
                        id: validateRecords.data.person
                    }
                }
            }
        })
        return records
    }
}

export const deleteRecords = async(id: string )=>{
    const records = await prisma.employment.delete({
        where: {
            id: id
        }
    })
    return records
}