import { Router } from "express";

import {
  addCreditHistory,
  deleteCreditHistory,
  updateCreditHistory,
  getCreditHistoryById,
  getCreditHistories,
} from "../controllers/creditHistoryController";

const creditHistoryRouter = Router();

creditHistoryRouter.post("/add", addCreditHistory);
creditHistoryRouter.get("/", getCreditHistories);
creditHistoryRouter.get("/:id", getCreditHistoryById);
creditHistoryRouter.put("/update/:id", updateCreditHistory);
creditHistoryRouter.delete("/delete/:id", deleteCreditHistory);

export default creditHistoryRouter;
