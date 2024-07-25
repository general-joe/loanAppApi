import { Request, Response, NextFunction} from "express"
import speakeasy from "speakeasy"
import { HttpStatus } from "../utils/http-status"
import HttpException
 from "../utils/http-error"
 import { ErrorResponse } from "../utils/types"

export const getSecretKey = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const secret = speakeasy.generateSecret({
            length: 25
        })
        res.status(HttpStatus.OK).json({secret: secret.base32})
    }catch(error){
        const err = error as ErrorResponse;
      throw new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    }
}

export const getToken = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const secret = req.body.secret
        const token = speakeasy.totp({
            secret,
            encoding: "base32",
            time: 30
        })
        res.status(HttpStatus.OK).json({token})

    }catch(error){
        const err = error as ErrorResponse;
      throw new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
              )
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const secret = req.body.secret
        const token = req.body.token
        const verified = speakeasy.totp.verify({
            secret,
            encoding: "base32",
            token,
            window: 2
        })
        if(!verified){
            throw new HttpException(HttpStatus.FORBIDDEN, "Token is not valid")
        }
        else{
            res.status(HttpStatus.OK).json({verified})
        }
    }catch(error){
        const err = error as ErrorResponse;
      throw new HttpException(
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
        
      )
    }
}
