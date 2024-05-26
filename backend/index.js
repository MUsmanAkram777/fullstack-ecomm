import express from 'express'
import dotenv from 'dotenv'
import DBConnection from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoute from './routes/orderRoute.js'
import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
app.use(express.json())

DBConnection()

app.get('/',(req,res)=>{
    console.log('App is running')
    res.send('App is running')
})



app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoute)


// custom error middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000

app.listen(PORT,console.log(`server is running on http://localhost:${PORT}`))