const Product = require('../models/product.models')

module.exports = {
  getAll: async (req, res, next) => {
    const {
      search,
      minPrice,
      maxPrice,
      category,
      subcategory,
      page = 1,
      limit = 20,
    } = req.query

    let filter = {}
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } },
      ]
    }
    if (category) {
      filter.category = category
    }
    if (subcategory) {
      filter.subcategory = subcategory
    }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = parseFloat(minPrice)
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice)
    }
    const skip = (parseInt(page) - 1) * parseInt(limit)
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))

    const totalProducts = await Product.countDocuments(filter)
    console.log(products.length)
    res.send({
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      page,
      products,
    })
  },
  create: async (req, res, next) => {
    try {
      const newProduct = new Product(req.body)
      await newProduct.save()

      return res.status(201).json({
        status: 'success',
        data: newProduct,
      })
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create product',
        error: err.message,
      })
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id)

      if (!product)
      {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        })
      }

      return res.status(200).json({
        status: 'success',
        data: product,
      })
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve product',
        error: err.message,
      })
    }
  },
}
