import { Router } from "express";
const bankRoute = Router();
import * as bank from "../controllers/bankController";
import { validatePayload } from "../middleware/validate-payload";

bankRoute.post("/create", validatePayload("bank"), bank.saveBank);
bankRoute.get("/", bank.getAllBanks);
bankRoute.put("/update/:id", bank.updateBankById);
bankRoute.get("/:id", bank.getSingleBank);
bankRoute.delete("/:id", bank.deleteBankById);

export default bankRoute;
