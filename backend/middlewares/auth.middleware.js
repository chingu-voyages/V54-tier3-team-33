const {verify} = require("jsonwebtoken");


module.exports = {
    authMiddleware: async (req , res , next) =>{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return  res.status(403).json({message:'forbidden'})
        const decoded =  await verify(token,process.env.JWT_STRONG_SECRET);
        req.userId = decoded.userId
        next();
    },
}
