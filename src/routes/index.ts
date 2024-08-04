import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./userRoute";
import documentRouter from "./documentRoute";

const appRouter = Router();
appRouter.use("/authentication", authRouter);
appRouter.use("/users", userRouter);
appRouter.use("/documents", documentRouter);
export default appRouter;
