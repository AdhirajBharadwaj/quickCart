import User from "../models/user.model.js";

export const getCart=async(req,res)=>{
    try{
        const user=await User.findById(req.userId);
        res.status(200).json({cart:user.cart});
    }
    catch(error){
        res.status(500).json({message:"Error getting cart",error:error.message});
    }
}

export const addToCart=async(req,res)=>{
    try{
        const {productId,quantity}=req.body;
        const user=await User.findById(req.userId);
        // Check if the product already exists in the user's cart
        const existingCartItem = user.cart.find(item => item.productId.toString() === productId);
        if(existingCartItem?.quantity==1 && quantity==-1){
            {
                user.cart=user.cart.filter(item=>item.productId.toString()!==productId);
                await user.save();
                return res.status(200).json({message:"Product removed from cart successfully"});
            }
        }
        if (existingCartItem) {
            // If the product exists, update its quantity
            existingCartItem.quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            user.cart.push({ productId, quantity });
        }
        
        // Save the updated user document
        await user.save();
        res.status(200).json({message:"Product added to cart successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error adding product to cart",error:error.message});
    }
}
export const removeFromCart=async(req,res)=>{
    try{
        const {productId}=req.body;
        let user=await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.cart.length===0){
            return res.status(404).json({message:"Cart is empty"});
        }
        const initialLength=user.cart.length;
        user.cart=user.cart.filter(item=>item.productId.toString()!==productId);
        if(user.cart.length===initialLength){
            return res.status(404).json({message:"Product not found in cart"});
        }
        await user.save();
        res.status(200).json({message:"Product removed from cart successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error removing product from cart",error:error.message});
    }
}
