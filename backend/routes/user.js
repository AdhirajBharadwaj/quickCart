import express from "express";
import {registerUser,loginUser} from "../controllers/user.js";
import { addToCart,removeFromCart,getCart } from "../controllers/cart.js";
import { verifyToken } from "../middleware/auth.js";
const router=express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/addtocart",verifyToken,addToCart);
router.post("/removefromcart",verifyToken,removeFromCart);
router.get("/cart",verifyToken,getCart);

export default router;

