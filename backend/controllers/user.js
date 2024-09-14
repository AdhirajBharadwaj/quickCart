import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser=async(req,res)=>{

    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({username,email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error creating user",error:error.message});
    }
}
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        
        res.status(200).cookie("token",token).json({message:"User logged in successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error logging in user",error:error.message});
    }
}