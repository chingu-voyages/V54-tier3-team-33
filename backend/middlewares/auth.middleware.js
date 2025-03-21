const {verify} = require("jsonwebtoken");


module.exports = {
    authMiddleware: async (req , res , next) =>{
        const token = req.cookies.token;
        if(!token) return  res.status(401).json({
            status: 'failed',
            message: 'Access denied. No token provided.',
        });
        try{
            const decoded =  await verify(token,process.env.JWT_STRONG_SECRET);
            req.userId = decoded.userId
            next();
        }catch (e) {
            res.status(403).json({message:'Invalid or expired token'})
        }

    },
}
