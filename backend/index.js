require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/err.controller')
const Product = require('./models/product')

const app = express()
const cors = require("cors");
const { connectToDatabase } = require("./config/db");
const port = process.env.PORT || 3000

//midlleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));
// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

app.use(globalErrorHandler);


//connexion à mongoDb
connectToDatabase()

//Routes
app.use('/api/auth', require('./routes/auth.routes'))


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

