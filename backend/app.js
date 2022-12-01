const express =require('express')
const app = express()
const cookieParser = require('cookie-parser')

// Imports of Routes
const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

const product = require('./routes/productRoute')
const user  = require("./routes/userRoute")
const order  = require("./routes/orderRoute")
 
// uses of /routes or api
app.use('/api/v1/',product)
app.use('/api/v1/',user)
app.use('/api/v1/',order)


// Error middleware
app.use(errorMiddleware)

 

module.exports = app
