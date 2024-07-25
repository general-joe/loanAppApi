import { Router } from "express";
import userRoute from "./userRoute"

const appRouter = Router();
appRouter.use("/users", userRoute)


export default appRouter;
