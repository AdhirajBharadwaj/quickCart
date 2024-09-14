import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  });
  const wishlistItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true
    }
  });

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cart:{
        type:[cartItemSchema],
        default:[],
    },
    wishlist:{
        type:[wishlistItemSchema],
        default:[],
    },
    
});

const User= mongoose.model("User",userSchema);

export default User;
