import { Router } from "express";

import adminAuth from "../middlewares/adminAuth.js";
import productsController from "../controllers/productsController.js";

const router = Router();

router.post("/", adminAuth, productsController.create);

router.get("/", productsController.get);

router.get("/:id", productsController.getById);

router.get("/categoria/:categoria", productsController.getByCategory);

router.put("/:id", adminAuth, productsController.updateById);

router.delete("/:id", adminAuth, productsController.deleteById);

export default router;
