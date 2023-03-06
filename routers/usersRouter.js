import { Router } from "express";

import adminAuth from "../middlewares/adminAuth.js";
import usersController from "../controllers/usersController.js";

const router = Router();

router.get("/", adminAuth, usersController.get);

router.get("/profile", usersController.getById);

router.put("/:id", adminAuth, usersController.updateById);

router.delete("/:id", adminAuth, usersController.deleteById);

export default router;
