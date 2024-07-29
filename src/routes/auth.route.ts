import { Router } from "express";
import {
    generateOtp,
    verifyOtp,
  

} from "../controllers/authentication.controller"

const authRouter = Router();

authRouter.post("/auth-login", generateOtp);

authRouter.post("/verify", verifyOtp);

export default authRouter;
