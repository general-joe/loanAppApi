import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./userRoute";
import documentRouter from "./documentRoute";
import loanRouter from "./loanRoute";
import bankRouter from "./bankRoute";
import currentDebtRoute from "./currentDebtRoute";
import expensesRoute from "./expensesRoute";
import financialRoute from "./financialRoute";
import publicRecordRouter from "./publicRecordRoute";
import creditHistoryRouter from "./creditHistoryRoute";
import personRoute from "./personRoute";

const appRouter = Router();
appRouter.use("/banks", bankRouter);
appRouter.use("/currentdebts", currentDebtRoute);
appRouter.use("/expenses", expensesRoute);
appRouter.use("/financials", financialRoute);

appRouter.use("/authentication", authRouter);
appRouter.use("/users", userRouter);
appRouter.use("/documents", documentRouter);
appRouter.use("/loan", loanRouter);
appRouter.use("/credithistory", creditHistoryRouter);
appRouter.use("/publicrecord", publicRecordRouter);
appRouter.use("/persons", personRoute);
export default appRouter;
