const  User  =  require('../models/user.model');
const   Otp   = require('../models/opt.model');
const  CustomError= require("../utils/error");
const jwt = require("jsonwebtoken");

const { generateOtp,  verifyTotp} = require("../services/otp/opt.service");
const {sendVerificationCode} = require("../services/nodemailer/mailing.service");
const {verify} = require("jsonwebtoken");


module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try{
            const foundUser = await User.findOne({ email });
            if(!foundUser){
                return res.status(404).json({
                    message: 'User not found with this email'
                }).end()
            }
            const validity = await foundUser.comparePassword(password);
            if(!validity){
                return res.status(404).json({
                    message: 'Password is incorrect'
                })
            }
            const token = jwt.sign(
                {
                    userId: foundUser._id,
                    isVerified: foundUser.account_verify,
                },
                process.env.JWT_STRONG_SECRET,
                {
                    expiresIn: 7*24*60*60
                }
            )

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
                maxAge: 7*24*60*60*1000
            });
            return res.status(201).json({
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

            // const otp = await generateOtp()

            // const newOtp = new Otp({
            //     passcode: otp,
            //     author:userDoc._id
            // })

            // const otpDoc = await newOtp.save()
            // if(!otpDoc){
            //     const mongodbError = new CustomError('Unexpected error occured from mongodb', 500)
            //     next(mongodbError)
            // }
            // const userInfo = userDoc._doc;
            // const code =  otpDoc.passcode;

            // await sendVerificationCode(code,userInfo)
            const token = jwt.sign(
                {
                    userId: userDoc._id,
                },
                process.env.JWT_STRONG_SECRET,
                {
                    expiresIn: 7*24*60*60
                }
            )

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
                maxAge: 7*24*60*60*1000
            });
            res.status(201).json({
                status:'succes',
                message:"Account created sucessfully"
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message: err.message,
            })
        }
    },
    getMe: async (req, res, next) => {
        const { userId } = req;
        try{
            const foundUser = await User.findById(userId)
            if(!foundUser){
                const error = new CustomError('User not found',404);
                next(error)
            }
            const { password , ...userData} = foundUser.toJSON();
            res.status(200).json({
                data: userData
            })
        }catch (err) {
            res.status(500).json({
                status:'error',
                message: err.message,
            })
        }
    },
    verifyOtp: async (res, req, next) => {
        try{
            const otp = await Otp.findOne({ author:req.userId })
            if(!otp){
                const error = new CustomError(`Otp with id : ${ req.userId }not found or expired`,404);
                next(error)
            }
            const isValid = verifyTotp(otp)
            if(!isValid){
                const error = new CustomError(`Not valid Otp `,401);
                next(error)
            }
            const user = await  User.findOneAndUpdate({_id:req.userId},{account_verify:true},{ new: true})
            return res.status(201).json({
                status:'succes',
                message:'Account verified successfully'
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message: err.message
            })
        }
    }
}
