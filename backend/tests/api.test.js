const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Product = require('../models/product.model')
const { initialProducts, productsInDb } = require('./test_helper')
const api = supertest(app)


beforeEach(async () => {
  await Product.deleteMany({})

  for (let product of initialProducts) {
    let productObject = new Product(product)
    await productObject.save()
  }
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
    assert.strictEqual(response.body.data.name, product.name)
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

after(async () => {
  await mongoose.connection.close()
})