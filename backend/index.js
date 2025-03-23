require('dotenv').config()
const express = require('express')
const globalErrorHandler = require('./controllers/err.controller')
const Product = require('./models/product')

const app = express()
const cors = require("cors");
const { connectToDatabase } = require("./config/db");
const port = process.env.PORT || 3000

//midlleware
app.use(cors());
app.use(express.json())
app.use(globalErrorHandler);


//connexion à mongoDb
connectToDatabase()

//Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/orders', require('./routes/order.routes'));



app.get('/', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.send(products)
})

app.post('/', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.send(newProduct)
})


app.listen(port, () => {
    console.log(`application started and listening on port ${port}`)
})

