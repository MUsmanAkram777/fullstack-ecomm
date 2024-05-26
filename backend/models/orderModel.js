import mongoose from "mongoose";



const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[
        {
            name:{type:String,required:true},
            qty:{type:Number,required:true},
            image:{type:String,required:true},
            price:{type:Number,required:true},
            id:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'Product'}
        }
    ],
    shippingAddress:{
        address:{type:String,required:true},
        street:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true},
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    paidAt:{
        type:Date
    },
    paymentMethod:{
        type:String,
        required:true
    },
    isDeliverd:{
        type:Boolean,
        required:true,
        default:false
    },
},{ timestamps:true })



const Order = mongoose.model('Order',orderSchema)
export default Order