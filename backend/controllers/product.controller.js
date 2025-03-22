const Product = require('../models/product.models')


module.exports = {
    getAll: async (req, res, next) => {
        const products = await Product.find({})
        console.log(products)
        res.send(products)
    },
    create: async (req, res, next) => {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.send(newProduct)
    }

}