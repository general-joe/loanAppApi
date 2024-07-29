import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./userRoute";

const appRouter = Router();
appRouter.use("/authentication", authRouter)
appRouter.use("/users", userRouter)

export default appRouter;
