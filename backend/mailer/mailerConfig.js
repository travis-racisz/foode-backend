const nodemailer = require('nodemailer')
const { sequelize } = require('../utils/sequelize')
const crypto = require('crypto')



    const transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        port: 465, 
        auth: { 
            user: process.env.EMAIL, 
            pass: process.env.PASS
        }
    
    })


    // NEED TO MOVE THIS TO A NEW FILE SO THAT THE TRANSPORTER CAN BE RETURNED AS A MODULE
    async function sendMail(_, { email }){ 
        const salt = await crypto.randomUUID()
        const generatedLink = await crypto.createHash('md5').update(salt).digest('hex')
        await sequelize.models.Links.create({
            generatedlink: generatedLink,
            used: false, 
            expired: false
        })
        try { 
            await transporter.sendMail({ 
                from: "tracisz14@gmail.com", 
                to: email,
                subject: "Test email 1234", 
                text: `click this link to register your business http://localhost:3000/owner/${generatedLink} `,
            })
            return {status: "successful delivery"}
        } catch(err){ 
            return err
        }
        
    }

module.exports = transporter



