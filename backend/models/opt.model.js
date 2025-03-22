
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const OtpSchema = new Schema({
    createdAt: {
        type: Date,
        expires: 2000,
        default: Date.now()
    },
    passcode: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model('Otp', OtpSchema)
