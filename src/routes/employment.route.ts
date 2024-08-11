import { Router } from "express";
const employmentRouter = Router();
import * as records from "../controllers/employment.controller";
import { validatePayload } from "../middleware/validate-payload";

employmentRouter.post("/save", validatePayload("employment"), records.saveEmploymentRecords);
employmentRouter.get("/", records.getEmploymentRecords);
employmentRouter.put("/update/:id", records.updateEmploymentRecords);
employmentRouter.get("/:id", records.getEmploymentRecordsById);
employmentRouter.delete("/:id", records.deleteEmploymentRecords);


export default employmentRouter;