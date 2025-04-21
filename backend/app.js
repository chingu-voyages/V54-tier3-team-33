require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const globalErrorHandler = require('./controllers/err.controller')
const loggerMiddleware = require('./middlewares/logger.middleware')
const path = require('path')
const app = express()
const cors = require('cors')

const { connectToDatabase } = require('./config/db')
connectToDatabase()

//midlleware
// Parse JSON and cookies
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.static('dist'))
app.use(loggerMiddleware)
app.use(globalErrorHandler)


//Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/products', require('./routes/product.routes'))
app.use('/api/orders', require('./routes/order.routes'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app