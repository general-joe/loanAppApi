import { Router } from "express";
import {
  requestLoan,
  updateLoan,
  getAllLoans,
  getLoanById,
  deleteLoandetails,
} from "../controllers/loanController";

const loanRouter = Router();

loanRouter.get("/", getAllLoans);
loanRouter.post("/request", requestLoan);
loanRouter.get("/:id", getLoanById);
loanRouter.put("/update/:id", updateLoan);
loanRouter.delete("/delete/:id", deleteLoandetails);

export default loanRouter;
