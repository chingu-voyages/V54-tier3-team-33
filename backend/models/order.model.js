const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },

  products: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref:'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
})

orderSchema.pre('findOne', function (next) {
  this.populate('products.id').populate('customerId')
  next()
})


const Order = mongoose.model('Order', orderSchema)


module.exports = Order
