const Order = require("../models/order.model");
const CustomError = require("../utils/error");

module.exports = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({ customerId: req.userId })
        .populate({
          path: "products.id",
        })
        .populate("customerId")
        .exec();

      const formattedOrders = orders.map((order) => {
        const safeItems = (order.products || [])
          .filter((p) => p && p.id)
          .map((p) => {
            return {
              product: {
                _id: p.id._id,
                name: p.id.name,
                price: p.id.price,
                category: p.id.category,
                description: p.id.description,
                image: p.id.image,
              },
              quantity: p.quantity,
              unitPriceAtOrder: p.price,
              subtotal: p.price * p.quantity,
            };
          });

        return {
          _id: order._id,
          customer: order.customerId,
          createdAt: order.createdAt,
          items: safeItems,
        };
      });

      return res.status(200).json({
        status: "success",
        data: formattedOrders,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  createOrder: async (req, res, next) => {
    const customerId = req.userId;
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "Products array is required and cannot be empty",
      });
    }

    const newOrder = new Order({
      customerId,
      products: products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    });

    try {
      await newOrder.save();
      return res.status(201).json({
        status: "success",
        message: "Order successfully created",
      });
    } catch (e) {
      return res.status(500).json({
        status: "failed",
        message: "Order creation failed",
        error: e.message,
      });
    }
  },
};
