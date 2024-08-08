import { Router } from "express";
import {
  getPublicRecords,
  getRecordById,
  deleteRecord,
  updatePublicRecord,
  addPublicRecord,
} from "../controllers/publicRecordController";

const publicRecordRouter = Router();

publicRecordRouter.get("/", getPublicRecords);
publicRecordRouter.get("/:id", getRecordById);
publicRecordRouter.post("/add", addPublicRecord);
publicRecordRouter.put("/update/:id", updatePublicRecord);
publicRecordRouter.delete("/delete/:id", deleteRecord);

export default publicRecordRouter;
