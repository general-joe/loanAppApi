import { Router } from "express";

import {
  addDocument,
  deleteDocument,
  updateDocument,
  getDocumentById,
  getDocuments,
} from "../controllers/documentController";

const documentRouter = Router();
documentRouter.post("/add", addDocument);
documentRouter.get("/", getDocuments);
documentRouter.get("/:id", getDocumentById);
documentRouter.put("/update/:id", updateDocument);
documentRouter.delete("/delete/:id", deleteDocument);
export default documentRouter;
