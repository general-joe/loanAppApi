import { Router } from "express";
const financialRoute = Router();
import * as financial from "../controllers/finacialController";
import { validatePayload } from "../middleware/validate-payload";

financialRoute.post(
  "/create",
  validatePayload("financial"),
  financial.saveFinancial
);

financialRoute.post(
  "/bulk",
  // validatePayload("financial"),
  financial.saveBulkFinancial
);

financialRoute.get("/", financial.getAllFinancials);
financialRoute.put("/update/:id", financial.updateFinancialById);
financialRoute.get("/:id", financial.getSingleFinancial);
financialRoute.delete("/:id", financial.deleteFinancialById);

export default financialRoute;
