import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {connectDB} from "./utils/db.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config({path:"./config.env"});
const app=express();
const PORT=process.env.PORT||3000;

const __dirname=path.resolve();

app.use(cors({
    origin:["https://quickcart-zow4.onrender.com"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);

app.use(express.static(path.join(__dirname,"./frontend/dist")));
app.get("*",(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
});
app.listen(PORT,()=>
{
    connectDB();
})