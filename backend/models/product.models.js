const mongoose = require('mongoose')
const { Schema } = mongoose;

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const productSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    subcategory: String,
    description: String,
    images: [String]
})
productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    },
  })
module.exports = mongoose.model('Product', productSchema)