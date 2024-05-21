import mongoose from "mongoose";
import dotenv from 'dotenv'
import DBConnection from "./config/db.js";
import products from "./data/products.js";
import users from "./data/users.js";
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'



dotenv.config() 
DBConnection()


const importData = async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return{
                ...product,
                user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)
        console.log('DATA IMPORTED SUCCESSFULLY!!!')
        process.exit()
    } catch (error) {
        console.log("ERROR IMPORTING DATA: "+error)
        process.exit(1)
    }
}



const destroyData = async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany() 
        console.log('DATA DESTROYED SUCCESSFULLY!!!')
        process.exit()
    } catch (error) {
        console.log("ERROR DESTROYING DATA: "+error)
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}