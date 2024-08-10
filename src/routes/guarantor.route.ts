import { Router } from "express";
const guarantorRouter = Router();
import * as records from "../controllers/guarantor.controller";
import { validatePayload } from "../middleware/validate-payload";

guarantorRouter.post("/save", validatePayload("guarantor"), records.saveGuarantorRecords);
guarantorRouter.get("/", records.getGuarantorRecords);
guarantorRouter.put("/update/:id", records.updateGuarantorRecords);
guarantorRouter.get("/:id", records.getGuarantorRecordsById);
guarantorRouter.delete("/:id", records.deleteGuarantorRecords);


export default guarantorRouter;