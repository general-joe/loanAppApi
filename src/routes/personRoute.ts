import { Router } from "express";
const personRoute = Router();
import * as person from "../controllers/personController";
import { validatePayload } from "../middleware/validate-payload";
import upload from "../utils/multer";

personRoute.post("/create",  upload.single("passport"), validatePayload("person"), person.savePerson);

personRoute.get("/", person.getAllPersons);

personRoute.put("/update/:id", person.updatePersonById);

personRoute.get("/:id", person.getSinglePerson);

personRoute.delete("/:id", person.deletePersonById);

export default personRoute;
