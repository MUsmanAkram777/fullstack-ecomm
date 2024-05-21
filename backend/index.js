import express from 'express'
import dotenv from 'dotenv'
import DBConnection from './config/db.js'
import productRoutes from './routes/productRoutes.js'


dotenv.config()
const app = express()


DBConnection()

app.get('/',(req,res)=>{
    console.log('App is running')
    res.send('App is running')
})



app.use('/api/products',productRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT,console.log(`server is running on http://localhost:${PORT}`))