const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

module.exports =  transporter