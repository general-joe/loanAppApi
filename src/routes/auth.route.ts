import { Router } from "express";
import {
   authlogin,
   verifyOtp
  

} from "../controllers/authentication.controller"

const authRouter = Router();

authRouter.post("/auth-login", authlogin);

authRouter.post("/verify", verifyOtp);

export default authRouter;
