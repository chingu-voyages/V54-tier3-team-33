module.exports = {
    getAll: async (req, res, next) => {
        const { search, minPrice, maxPrice, category, subcategory, page = 1, limit = 20 } = req.query;
    
        console.log("Query Parameters:", { search, minPrice, maxPrice, category, subcategory, page, limit });
    

    let filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { subcategory: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      filter.category = category;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    console.log("Filter Object:", filter); // Log the filter object

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    console.log("Products Fetched:", products.length); // Log the number of products fetched

    const totalProducts = await Product.countDocuments(filter);
    res.send({
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      page: parseInt(page),
      products, // Return products as part of an object
    });
  },
};
