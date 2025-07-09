const express  = require ('express')
const cors = require ('cors')
const conn =require ('./utilities/connectdb')
const userrouter= require ('./routes/user_routes')
const app = express();

app. use (cors())
app.use(express.json())
app.use("/api", userrouter)

const startserver= async()=> {
    try{
        await conn()
        app.listen(5000,() => {
            console.log('server is starting on the port 5000')
    
        })
    }
        catch(error){
            console.log("failed to port server");
        }
    }

startserver ()
