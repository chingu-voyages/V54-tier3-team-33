import User  from '../models/user.model';
import Otp  from  '../models/opt.model';
import CustomError from "../utils/error";
import jwt from "jsonwebtoken";
import {generateOtp} from "../services/otp/opt.service";


module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;

        try{
            const foundUser = await User.findOne({ email });
            if(!foundUser){
                const error = new CustomError('User not found',404);
                next(error)
            }
            const validity = await foundUser.comparedPassword(password);
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
                    expiresIn: process.env.JWT_EXPIRES_TIME
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
