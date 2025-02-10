const app = require('./app');
const connectDB = require('./db/db');




require('dotenv').config();




const startServer =async ()=>{
    try {
        

        const port=process.env.PORT
        
        connectDB()

        app.listen(port,()=>{
            console.log(`Server is Running on Port ${port}`)
        })
    } catch (error) {
        console.log("error starting server",error);
        process.exit(1);
        
    }
}

startServer()