const  transporter  = require('../../config/nodemailer')

module.exports = {
    sendVerificationCode: async (code, user) => {
         const emailData = {
              from: process.env.EMAIL_FROM,
              to: user.email,
              subject: "Test Email",
              text: `Bonjour ${user.firstname}, voici votre code de verification: ${code}`,
         };

         try {
              const info = await sendMail(emailData);
              console.log("Email sent successfully:", info);
         } catch (error) {
              console.error("Error sending email:", error);
         }
    }
}


async function sendMail(data) {
     return transporter.sendMail(data)
}




