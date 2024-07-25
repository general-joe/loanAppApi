import { Router } from "express";
import {
    getSecretKey,
    getToken,
    verifyToken

} from "../controllers/authentication.controller"

const authRouter = Router();

authRouter.post("/secret-key", getSecretKey);

authRouter.post("/token", getToken);

authRouter.post("/verify-token", verifyToken);

export default authRouter;
