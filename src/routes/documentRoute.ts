import { Router } from "express";

import {
  addDocument,
  deleteDocument,
  updateDocument,
  getDocumentById,
  getDocuments,
} from "../controllers/documentController";
import upload from "../utils/multer";
import { validatePayload } from "../middleware/validate-payload";

const documentRouter = Router();
documentRouter.post(
  "/add",
  upload.single("document"),
  validatePayload("documents"),
  addDocument
);
documentRouter.get("/", getDocuments);
documentRouter.get("/:id", getDocumentById);
documentRouter.put("/update/:id", upload.single("document"),updateDocument);
documentRouter.delete("/delete/:id", deleteDocument);
export default documentRouter;
