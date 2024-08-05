import { Router } from "express";
const expensesRoute = Router();
import * as expenses from "../controllers/expensesController";
import { validatePayload } from "../middleware/validate-payload";

expensesRoute.post(
  "/create",
  validatePayload("expenses"),
  expenses.saveExpenses
);
expensesRoute.get("/", expenses.getAllExpenses);
expensesRoute.put("/update/:id", expenses.updateExpensesById);
expensesRoute.get("/:id", expenses.getSingleExpense);
expensesRoute.delete("/:id", expenses.deleteExpensesById);

export default expensesRoute;
