const nodemailer = require('nodemailer')
require('dotenv').config()
    const transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        port: 465, 
        auth: { 
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD
        }
    
    })
   

module.exports = transporter



