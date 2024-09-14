import express from "express";
import {getAllProducts,getProductById} from "../controllers/product.js";

const router=express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProductById);
// router.post("/many",createManyProducts);
export default router;


