import jwt from "jsonwebtoken";

export const verifyToken=async(req,res,next)=>{
    try{
        const token=req.cookies && req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }
    catch(error){
        res.status(500).json({message:"Error verifying token",error:error.message});
    }
}

