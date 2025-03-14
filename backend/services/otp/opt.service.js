const {
    generateSecret,
    totp
} = require("speakeasy");

const secret = generateSecret({length:20});
module.exports = {
    generateOtp: async() => {
        //generate a password using the secret
        return await totp({
            secret: secret.base32,
            encoding: 'base32'
        })
    },
    verifyOtp:(otp) => {
        return totp.verify({
            secret:secret.base32,
            encoding:'base32',
            token:otp.passcode,
            window:30
        })
    }
};
