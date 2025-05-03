const User = require('../models/user.model')
const CustomError = require('../utils/error')
const jwt = require('jsonwebtoken')

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body
    try {
      const foundUser = await User.findOne({ email })
      if (!foundUser) {
        return res
          .status(404)
          .json({
            message: 'User not found with this email',
          })
          .end()
      }
      const validity = await foundUser.comparePassword(password)
      if (!validity) {
        return res.status(404).json({
          message: 'Password is incorrect',
        })
      }
      const token = jwt.sign(
        {
          userId: foundUser._id,
          isVerified: foundUser.account_verify,
        },
        process.env.JWT_STRONG_SECRET,
        {
          expiresIn: 7 * 24 * 60 * 60,
        }
      )
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      return res.status(200).json({
        status: 'success',
        message: 'logged in successfully',
      })
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e.message,
      })
    }
  },
  register: async (req, res, next) => {
    const { email, password, firstname, lastname } = req.body
    try {
      const user = await User.findOne({ email: email })
      if (user) {
        return res.status(401).json({ message: 'Email already in use' })
      }
      const newUser = new User({
        email,
        password,
        firstname,
        lastname,
      })
      const userDoc = await newUser.save()
      if (!userDoc) {
        const mongodbError = new CustomError(
          'Unexpected error occured from mongodb',
          500
        )
        next(mongodbError)
      }
      const token = jwt.sign(
        {
          userId: userDoc._id,
        },
        process.env.JWT_STRONG_SECRET,
        {
          expiresIn: 7 * 24 * 60 * 60,
        }
      )
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.status(201).json({
        status: 'success',
        message: 'Account created sucessfully',
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      })
    }
  },
  getMe: async (req, res, next) => {
    const { userId } = req
    try {
      const foundUser = await User.findById(userId)
      if (!foundUser) {
        const error = new CustomError('User not found', 404)
        next(error)
      }
      const { ...userData } = foundUser.toJSON()
      res.status(200).json({
        data: userData,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      })
    }
  },
  logout: async (req, res, next) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    })
    res.status(200).json({
      status: 'success',
      message: 'signed out successfully',
    })
  },
}
