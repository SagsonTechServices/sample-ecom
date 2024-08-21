// required packages 
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes')
dotenv.config()

// create an express app 
const app = express()
const port = process.env.PORT

// configure middlewares 
app.use(express.json())
app.use(cors())

// setup routes
app.use('/api/products' , productRoutes)

app.get('/' , (req , res) => {
    res.send('Welcome to the ecommerce sample server API')
}) 

// start the server 
app.listen(port , () => {
    console.log(`app started at port: ${port}`)
})
