import prisma from "../utils/prisma";
import { guarantorSchema, guarantorRecords } from "../validators/guarantor.Schema";

export const saveRecords = async(data: guarantorRecords)=>{
    const validateRecords = guarantorSchema.safeParse(data) 
    if(validateRecords.success){
        const guarantor = await prisma.guarantor.create({
            data: {
                fullname: validateRecords.data.fullname,
                address: validateRecords.data.address,
                telephone: validateRecords.data.telephone,
                relationship: validateRecords.data.relationship,
                person: {
                    connect: {
                        id: validateRecords.data.person
                    }
                }
            }
        })
        return guarantor
    }
    
}


export const getRecords = async()=>{
    const guarantor = await prisma.guarantor.findMany({
        include: {
            person: true
        }
    })
    return guarantor
}


export const getRecordsById = async(id: string)=>{
    const guarantor = await prisma.guarantor.findUnique({
        where: {
            id
        },
        include: {
            person: true
        }
    })
    return guarantor
}

export const updateRecords = async(id: string, data: guarantorRecords )=>{
    const validateRecords = guarantorSchema.safeParse(data) 
    if(validateRecords.success){
        const guarantor = await prisma.guarantor.update({
            where: {
                id: id
            },
            data: {
                fullname: validateRecords.data.fullname,
                address: validateRecords.data.address,
                telephone: validateRecords.data.telephone,
                relationship: validateRecords.data.relationship,
                person: {
                    connect: {
                        id: validateRecords.data.person
                    }
                }
            }
        })
        return guarantor
    }
}

export const deleteRecords = async(id: string )=>{
    const guarantor = await prisma.guarantor.delete({
        where: {
            id: id
        }
    })
    return guarantor
}