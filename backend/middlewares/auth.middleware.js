const { verify } = require('jsonwebtoken')

module.exports = {
  authMiddleware: (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
      return res.status(403).json({ message: 'Forbidden: No token provided' })
    }


    verify(token, process.env.JWT_STRONG_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' })
      }

      req.userId = decoded.userId
      next()
    })
  },
}
