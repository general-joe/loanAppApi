import { Router } from "express";
const personRoute = Router();
import * as person from "../controllers/personController";
import { validatePayload } from "../middleware/validate-payload";

personRoute.post("/create", validatePayload("person"), person.savePerson);

personRoute.get("/", person.getAllPersons);

personRoute.put("/update/:id", person.updatePersonById);

personRoute.get("/:id", person.getSinglePerson);

personRoute.delete("/:id", person.deletePersonById);

export default personRoute;
