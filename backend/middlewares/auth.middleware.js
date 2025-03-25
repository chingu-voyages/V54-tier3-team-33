/* const {verify} = require("jsonwebtoken");


module.exports = {
    authMiddleware: async (req , res , next) =>{
        const token = req.cookies.access_token;
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
 */

const { verify } = require("jsonwebtoken");

module.exports = {
    authMiddleware: (req, res, next) => {
        
        const token = req.cookies.token;  
        console.log("Received Token:", token);

        if (!token) {
            return res.status(403).json({ message: 'Forbidden: No token provided' });
        }

        
        verify(token, process.env.JWT_STRONG_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
            }

            req.userId = decoded.userId;  
            next();  
        });
    },
};
