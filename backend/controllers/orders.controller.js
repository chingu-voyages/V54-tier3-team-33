const Order = require('../models/order.model');
const CustomError = require("../utils/error");

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            console.log('User ID:', req.userId);
            const orders = await Order.find({ userId: req.userId });

            if (!orders || orders.length === 0) {
                const error = new CustomError('No orders found', 404);
                return next(error);
            }

            res.status(200).json({
                status: 'success',
                data: orders,
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    },
    createOrder: async (req, res, next) => {
        const { userId, items } = req.body;

        try {
            const newOrder = new Order({
                userId,
                items,
            });

            const orderDoc = await newOrder.save();
            if (!orderDoc) {
                return next(new CustomError('Error creating order', 500));
            }

            res.status(201).json({
                status: 'success',
                data: orderDoc,
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    },
};