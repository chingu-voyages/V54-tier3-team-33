const  User  =  require('../models/user.model');
const   Otp   = require('../models/opt.model');
const  CustomError= require("../utils/error");
const jwt = require("jsonwebtoken");

const { generateOtp } = require("../services/otp/opt.service");
const {sendVerificationCode} = require("../services/nodemailer/mailing.service");


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

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
            });
            res.status(201).json({
                status: "sucess",
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
        const { email, password, firstname, lastname } = req.body
        try{
            const user = await User.findOne({email:email})
            if(user){
                return res.status(401).json({message:'Email already in use'})
            }
            const  newUser = new User({
                email,
                password,
                firstname,
                lastname,
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
            const userInfo = userDoc._doc;
            const code =  otpDoc.passcode;

            await sendVerificationCode(code,userInfo)
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
    getMe: async (res, req, next) => {
        const { userId } = req;
        try{
            const foundUser = await User.findById(userId).exec()
            if(!foundUser){
                const error = new CustomError('User not found',404);
                next(error)
            }
            const { password , ...data} = foundUser;
            res.status(200).json({
                status:'success',
                message: "User fetched successfully"
            })
        }catch (e) {
            return  res.status(500).json({
                status:'error',
                message: err.message,
            })
        }

    }
}
