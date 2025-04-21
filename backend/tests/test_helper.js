const Product = require('../models/product.model')
const User = require('../models/user.model')
const Order = require('../models/order.model')
const initialProducts = [
  {
    'name': 'Vizio MQX Series 4K TV (70-inch)',
    'price': 699,
    'description': 'Quantum Color, Active Full Array backlight, and AMD FreeSync for smooth gaming.',
    'category': 'Electronics',
    'subcategory': 'Televisions',
    'image': [
      'https://m.media-amazon.com/images/I/715pyg8ByPL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/71LdTh8Vz4L._AC_SX466_.jpg'
    ],
    'id': '6802e076f7ce5a60882a88c4',
    'rating': 1,
    'sold': 214,
    'stock': 1
  },
  {
    'name': 'Roland GO:KEYS Music Creation Keyboard',
    'price': 299,
    'description': '61 lightweight keys with Bluetooth MIDI, loop mixing function, and battery-powered portability.',
    'category': 'Music',
    'subcategory': 'Keyboards',
    'image': [
      'https://m.media-amazon.com/images/I/81ZSsGi9CKL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71-U7JZyMWL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71xFOgPm6uL._AC_SX679_.jpg'
    ],
    'id': '6802e076f7ce5a60882a88c5',
    'rating': 2,
    'sold': 200,
    'stock': 6
  }]
const productsInDb = async () => {
  const products  = await Product.find({})
  return products.map(product => product.toJSON())
}
const user = {
  'firstname': 'bob',
  'lastname': 'beb',
  'email': 'test@gmail.com',
  'password': 'test'
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const ordersInDb = async () => {
  const orders = await Order.find({})
  return orders.map(o => o.toJSON())
}
module.exports = { initialProducts, productsInDb, user, usersInDb, ordersInDb }