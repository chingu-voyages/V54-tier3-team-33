const speakeasy = require("speakeasy");

const secret = speakeasy.generateSecret({length:20});
module.exports = {
    generateOtp: async() => {
        //generate a password using the secret
        return await speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        })
    },
    verifyTotp:(otp) => {
        return speakeasy.totp.verify({
            secret:secret.base32,
            encoding:'base32',
            token:otp.passcode,
            window:30
        })
    }
};
