/* const User =  require('../models/user.model');
const  Opt = require('../models/opt.model');
const  CustomError= require("../utils/error");
const jwt = require("jsonwebtoken");

const { generateOtp } = require("../services/otp/opt.service");


module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try{
            const foundUser = await User.findOne({ email });
            if(!foundUser){
                const error = new CustomError('User not found',404);
                next(error)
            }
            const validity = await foundUser.comparePassword(password);
            if(!validity){
                const error = new CustomError('Pair identifiant/password not correct',401);
                next(error)
            }
            const token = jwt.sign(
                {
                    userId: foundUser._id,
                    isVerified: foundUser.account_verify,
                },
                process.env.JWT_STRONG_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE_TIME
                }
            )
            res.status(201).json({
                token: token,
                userId: foundUser._id,
                message:'logged in successfully'
            });
        }catch (e) {
            res.status(500).json({
                status:'error',
                message: e.message,
            })
        }
    },
    register: async (req , res , next) => {
        const { email } = req.body
        try{
            const user = await User.findOne({email:email})
            if(user){
                return res.status(401).json({message:'Email already in use'})
            }
            const  newUser = new User({
                email: email,
                password: req.body.password
            })
            const userDoc = await newUser.save()
            if(!userDoc){
                const mongodbError = new CustomError('Unexpected error occured from mongodb', 500)
                next(mongodbError)
            }

            const otp = await generateOtp()

            const newOtp = new Otp({
                passcode: otp,
                author:userDoc._id
            })

            const otpDoc = await newOtp.save()
            if(!otpDoc){
                const mongodbError = new CustomError('Unexpected error occured from mongodb', 500)
                next(mongodbError)
            }
            const token = jwt.sign(
                {
                    userId: userDoc._id,
                    isVerified:userDoc.account_verify,
                },
                process.env.JWT_STRONG_SECRET,
                {
                    expiresIn:'24h'
                }
            )
            const { password , ...data} =   userDoc._doc
            res.status(201).json({
                status:'succes',
                message:"Account created sucessfully"
            })


        }catch(err){
            return  res.status(500).json({
                status:'error',
                message: err.message,
            })
        }
    },
}
 */

const User = require('../models/user.model');
const Otp = require('../models/opt.model');
const CustomError = require("../utils/error");
const jwt = require("jsonwebtoken");

const { generateOtp } = require("../services/otp/opt.service");

module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const foundUser = await User.findOne({ email });
            if (!foundUser) {
                const error = new CustomError('User not found', 404);
                return next(error); 
            }
            const validity = await foundUser.comparePassword(password);
            if (!validity) {
                const error = new CustomError('Pair identifiant/password not correct', 401);
                return next(error); 
            }

            const token = jwt.sign(
                {
                    userId: foundUser._id,
                    isVerified: foundUser.account_verify,
                },
                process.env.JWT_STRONG_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE_TIME
                }
            );

            return res.status(201).json({
                token: token,
                userId: foundUser._id,
                message: 'logged in successfully'
            }); 
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    },
    register: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                return res.status(401).json({ message: 'Email already in use' });
            }

            const newUser = new User({
                email: email,
                password: password
            });

            const userDoc = await newUser.save();
            if (!userDoc) {
                const mongodbError = new CustomError('Unexpected error occurred from MongoDB', 500);
                return next(mongodbError); 
            }

            const otp = await generateOtp();

            const newOtp = new Otp({
                passcode: otp,
                author: userDoc._id
            });

            const otpDoc = await newOtp.save();
            if (!otpDoc) {
                const mongodbError = new CustomError('Unexpected error occurred from MongoDB', 500);
                return next(mongodbError); 
            }

            const token = jwt.sign(
                {
                    userId: userDoc._id,
                    isVerified: userDoc.account_verify,
                },
                process.env.JWT_STRONG_SECRET,
                {
                    expiresIn: '24h'
                }
            );

            return res.status(201).json({
                status: 'success',
                message: 'Account created successfully'
            }); 

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    },
};
