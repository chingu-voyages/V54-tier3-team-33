require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/err.controller");
const Product = require("./models/product.models");

const app = express();
const cors = require("cors");
const { connectToDatabase } = require("./config/db");
const port = process.env.PORT || 3000;

//midlleware
app.use(cors());
// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(express.static("dist"));
app.use(globalErrorHandler);

connectToDatabase();

//Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));

app.listen(port, () => {
  console.log(`application started and listening on port ${port}`);
});
