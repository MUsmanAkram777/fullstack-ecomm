import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true}
}, { timestamps:true })

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    description:String,
    brand:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    comparePrice:{
        type:Number,
        required: false
    },
    onSale:{
        type:Boolean,
        required: false
    },
    countInStock:{
        type:Number,
        required: true
    },
    rating:{
        type:Number,
        required: false
    },
    numReviews:{
        type:Number,
        required: false
    },
    tags:{
        type:[String]
    },
    reviews:{
        type:[reviewSchema]
    }
}, { timestamps:true }) 


const Product = mongoose.model('Product',productSchema)

export default Product