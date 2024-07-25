import { Router } from "express";
import authRouter from "./auth.route";

const appRouter = Router();
appRouter.use("/authentication", authRouter)

export default appRouter;
