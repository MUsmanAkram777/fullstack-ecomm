import Product from '../models/productModel.js'
import asyncHandler from "express-async-handler"



const getroducts = asyncHandler(async(req,res,next)=>{
    const products = await Product.find({})
    res.json(products)
})


const getroductById = asyncHandler(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        console.log('Product not found!!')
        res.status(404).json({message:'Product not found!!'})
    }
})


export {getroducts,getroductById}