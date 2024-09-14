import Product from "../models/product.model.js";
import ApiFeatures from "../utils/ApiFeatures.js";
// const manyproducts=[
//  {   name:"Laptop 4",
//     price:55000,
//     description:"This is a Laptop 4",
//     category:"Laptops",
//     image:"https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/category/laptop/xps/fy24-family-launch/prod-312204-apjc-laptop-xps-16-9640-14-9440-13-9340-800x620-pl-gr.png?fmt=png-alpha&wid=800&hei=620",
//     stock:10
//  },
//  {
//     name:"Shoe 4",
//     price:4300,
//     description:"This is a shoe 4",
//     category:"Footwear",
//     image:"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
//     stock:20
//  },
//  {
//     name:"Shirt 4",
//     price:2500,
//     description:"This is a Shirt 4",
//     category:"Clothing",
//     image:"https://priveeparis.in/cdn/shop/files/black-luxury-shirt-diamond-pattern.jpg?v=1686915526",
//     stock:10
// },
// {
//     name:"Books 4",
//     price:620,
//     description:"This is a Books 4",
//     category:"Books",
//     image:"https://m.media-amazon.com/images/I/711c-uf6AFL._AC_UF1000,1000_QL80_.jpg",
//     stock:10
// },
// {
//     name:"Multivitamin 4",
//     price:1500,
//     description:"This is a Multivitamin 4",
//     category:"Health",
//     image:"https://img2.hkrtcdn.com/30875/prd_3087491-MuscleBlaze-MBVITE-Daily-Multivitamin-for-Enhanced-Energy-Stamina-Gut-Health-30-tablets-Unflavoured_o.jpg",
//     stock:10
// },
// {
//     name:"Food 4",
//     price:400,
//     description:"This is a Food 4",
//     category:"Food",
//     image:"https://www.jiomart.com/images/product/original/491553852/britannia-marie-gold-biscuits-950-g-product-images-o491553852-p491553852-1-202302260446.jpg?im=Resize=(420,420)",
//     stock:10
// },

// ]



export const getAllProducts=async(req,res)=>{
    try{
        const features=new ApiFeatures(Product.find(),req.query).search().category().filter().sort().paginate();
        const products=await features.query;
        res.status(200).json({products});
    }
    catch(error){
        res.status(500).json({message:"Error fetching products",error:error.message});
    }
}
export const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.status(200).json({product});
    }
    catch(error){
        res.status(500).json({message:"Error fetching product",error:error.message});
    }
}

export const createManyProducts=async(req,res)=>{
    try{
        const products=await Product.insertMany(manyproducts);
        res.status(201).json({products});
    }
    catch(error){
        res.status(500).json({message:"Error creating products",error:error.message});
    }
}