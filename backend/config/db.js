import mongoose from "mongoose";



const DBConnection = async () =>{
    try {
        const connect = mongoose.connect(process.env.DATABASE_URL,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true 
        })
        console.log('DB CONNECTED')
    } catch (error) {
        console.log('DB Connection Error: ' + error )
        process.exit(1)
    }
}


export default DBConnection