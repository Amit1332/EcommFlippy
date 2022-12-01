const app= require('./app')
const dotenv   = require('dotenv')
dotenv.config({path:"./config/config.env"})
const databaseConn =require('./config/database')

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down th server due to uncaught Exception")
 
     process.exit(1)
  
})

const PORT = process.env.PORT

// database connection call after config
databaseConn()

const server = app.listen(PORT, ()=>{
    console.log("connection succesfull")
}) 

// Unhandled Promise Rejection  - jab database name galat ho tab server crash ho jata hai tab

process.on("unhandledRejection", (err)=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down th server due to unhandled rejection")

    server.close(()=>{
     process.exit(1)
    })
})
