import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./userRoute";
import documentRouter from "./documentRoute";
import loanRouter from "./loanRoute";

const appRouter = Router();
appRouter.use("/authentication", authRouter);
appRouter.use("/users", userRouter);
appRouter.use("/documents", documentRouter);
appRouter.use("/loan", loanRouter);
export default appRouter;
