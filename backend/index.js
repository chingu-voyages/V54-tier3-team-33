require('dotenv').config()
const express = require('express')
const Product = require('./models/product')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3000


app.use(cors());
app.use(express.json())

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

