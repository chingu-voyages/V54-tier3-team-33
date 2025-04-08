const Product = require('../models/product.models')


module.exports = {
    getAll: async (req, res, next) => {
        const {search, minPrice, maxPrice, category, subcategory, page = 1, limit = 20} = req.query
        let filter = {}
        if (search) {
            filter.$or = [
                {name: {$regex: search, $options: 'i'}},
                {category: {$regex: search, $options: 'i'}},
                {subcategory: {$regex: search, $options: 'i'}}
            ]
        }
        if (category){
            filter.category = category
        }
        if (subcategory){
            filter.subcategory = subcategory
        }
        if (minPrice || maxPrice){
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }
        const skip = (parseInt(page) - 1)* parseInt(limit)
        const products = await Product.find(filter).skip(skip).limit(parseInt(limit))

        const totalProducts = await Product.countDocuments(filter)
        console.log(products.length)
        res.send({
            totalPages: Math.ceil(totalProducts / parseInt(limit)),
            page,
            products})
    },
    create: async (req, res, next) => {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.send(newProduct)
    },
    getOne: async (req, res, next) => {
        const {id} = req.params
        const product = await Product.findById(id)
        res.send(product)
    }

}