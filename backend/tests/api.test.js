const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Order = require('../models/order.model')
const { initialProducts, productsInDb, user, usersInDb, ordersInDb } = require('./test_helper')
const api = supertest(app)

let cookie = null
beforeEach(async () => {
  await Product.deleteMany({})
  await User.deleteMany({})
  await Order.deleteMany({})
  for (let product of initialProducts) {
    let productObject = new Product(product)
    await productObject.save()
  }
  const newUser = new User(user)
  await newUser.save()

  const res = await api
    .post('/api/auth/login')
    .send(user)
    .expect(200)
  cookie = res.headers['set-cookie'][0]

  const users = await usersInDb()
  const products = await productsInDb()
  const order = new Order({
    customerId: users[0].id,
    products: [
      {
        id: products[0].id,
        quantity: 2,
        price: products[0].price,
      },
      {
        id: products[1].id,
        quantity: 1,
        price: products[1].price,
      }
    ]
  })

  await order.save()
})
describe('Product tests',() => {
  test('all products are returned', async () => {
    const products = await productsInDb()
    assert.strictEqual(products.length, 2)
  })
  test('single product is returned when id is provided', async () => {
    const products = await productsInDb()
    const product = products[0]
    const response = await api
      .get(`/api/products/${product.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.name, product.name)
  } )
  test('product is created successfully', async () => {
    const newProduct = {
      'name': 'Formal Suit',
      'price': 199.99,
      'description': 'A well-tailored formal suit for business and special occasions.',
      'category': 'Clothes',
      'subcategory': 'Suites',
      'images': ['https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/27748182/2024/2/21/f7c1aabb-1505-4630-bd25-53eb15a153711708492338173TwoPieceNavyTexturedFormalSuits-Waves1.jpg']
    }
    await api
      .post('/api/products')
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const productsAtEnd = await productsInDb()
    assert.strictEqual(productsAtEnd.length, initialProducts.length + 1)
  })
  test('404 when fetching a non-existing product', async () => {
    await api
      .get('/api/products/507f1f77bcf86cd799439011')
      .expect(404)
  })
  test('error when creating a product with missing data', async () => {
    const invalidProduct = {
      'name': '',
      'subcategory': 'Invalid',
      'images': []
    }
    const response = await api
      .post('/api/products')
      .send(invalidProduct)
      .expect(500)
    assert.strictEqual(response.body.status, 'error')
  })})

describe('Auth tests', () => {
  test('user can register succesfully', async () => {
    const newUser = {
      'firstname': 'ismail',
      'lastname': 'm',
      'email': 'ismailcodes@gmail.com',
      'password': 'test'
    }
    const response = await api
      .post('/api/auth/register')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.status, 'success')
  })
  test('user can login successfully', async () => {
    const response = await api
      .post('/api/auth/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.status, 'success')
  }
  )
  test('user can get their profile', async () => {
    const response = await api
      .get('/api/auth/me')
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.data.email, user.email)
  })
  test('user can logout successfully', async () => {
    const response = await api
      .post('/api/auth/logout')
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.status, 'success')
  })
})

describe('Order tests', () => {
  test('can create an order successfully', async () => {
    const products = await productsInDb()

    const order = {
      products: [
        {
          id: products[0].id,
          quantity: 2,
          price: products[0].price,
        },
        {
          id: products[1].id,
          quantity: 1,
          price: products[1].price,
        }
      ]
    }
    const response = await api
      .post('/api/orders')
      .set('Cookie', cookie)
      .send(order)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.status, 'success')
    const ordersAtEnd = await ordersInDb()
    assert.strictEqual(ordersAtEnd.length, 2 )  }) // we setup one order in beforeEach
  test('user can get his orders', async () => {
    const response = await api
      .get('/api/orders')
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.status, 'success')
    assert.strictEqual(response.body.data.length, 1)
  })
}
)
after(async () => {
  await mongoose.connection.close()
})