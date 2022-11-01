import {
  addPerson,
  deletePerson,
  getAll,
  importData,
  updatePerson,
} from "../controllers/main.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/middleware.js";
const router = Router();

router.post("/person/addPerson", addPerson);

router.post("/person/updatePerson", updatePerson);

router.post("/person/deletePerson", deletePerson);

router.get("/person/getAll", getAll);

router.post("/person/import", upload.single("file"), importData);

export default router;
