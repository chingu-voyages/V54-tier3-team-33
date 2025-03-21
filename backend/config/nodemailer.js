const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_IS_SECURE,
    auth: {

        user: process.env.MAILER_USER,
        password: process.env.MAILER_PASSWORD
    }
})

module.exports = transporter;
