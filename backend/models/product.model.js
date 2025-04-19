const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number },
  stock: { type: Number },
  sold: { type: Number },
  image: { type: [String] }
})
productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Product', productSchema)