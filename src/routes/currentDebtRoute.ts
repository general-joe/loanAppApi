import { Router } from "express";
const currentDebtRoute = Router();
import * as currentDebt from "../controllers/currentDebtController";
import { validatePayload } from "../middleware/validate-payload";

currentDebtRoute.post("/create", validatePayload("currentDebt"), currentDebt.saveCurrentDebt);
currentDebtRoute.get("/", currentDebt.getAllCurrentDebts);
currentDebtRoute.put("/update/:id", currentDebt.updateCurrentDebtById);
currentDebtRoute.get("/:id", currentDebt.getSingleCurrentDebt);
currentDebtRoute.delete("/:id", currentDebt.deleteCurrentDebtById);

export default currentDebtRoute;
