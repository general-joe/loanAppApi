import {Request, Response, NextFunction } from "express"
import speakeasy from "speakeasy"
import prisma from "../utils/prisma"
import HttpException from "../utils/http-error"
import { HttpStatus } from "../utils/http-status"
import * as bcrypt from "../utils/bcrypt";
import { ErrorResponse } from "../utils/types"




export const authlogin = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {email, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user){
            res.status(HttpStatus.NOT_FOUND).json({message: "User not found"})
        }else{
            const verifypassword = await bcrypt.compare(password, user.password)
            if(!verifypassword){
                res.status(HttpStatus.UNAUTHORIZED).json({message: "Invalid password"})
            }
            const secret = speakeasy.generateSecret({
                length: 20,
            }).base32

            await prisma.user.update({
                where: {email},
                data: {
                    secret: secret
                },
                
            })
            res.status(HttpStatus.ACCEPTED).json({mesage: user.id, secret})
        }
    }catch(error){
        const err = error as ErrorResponse;
        next(
          new HttpException(
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            err.message
          )
        );

    }
}

export const verifyOtp = async(req:Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const {token} = req.body
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        
        const verified = speakeasy.totp.verify({
            secret: user?.secret!,
            token,
            encoding: "base32",
            window: 1
        })
        if(!verified){
            res.status(HttpStatus.NOT_FOUND).json({message: "Verification Failed" })
        }else{
            await prisma.user.update({
                where: { email: user?.email },
                data: {
                    secret: user?.secret
                }
            })
        }

    }catch(error){
        const err = error as ErrorResponse;
        next(
          new HttpException(
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            err.message
          )
        );
    }
}