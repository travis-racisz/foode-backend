const { sequelize } = require('../utils/sequelize')
const transporter = require("./mailerConfig.js")
const crypto = require('crypto')

async function sendMail(_, email, sender, subject, body){ 
    const salt = await crypto.randomUUID()
    const generatedLink = await crypto.createHash('md5').update(salt).digest('hex')
    await sequelize.models.Links.create({
        generatedlink: generatedLink,
        used: false, 
        expired: false
    })
    try { 
        await transporter.sendMail({ 
            from: sender, 
            to: email,
            subject: subject, 
            text: body,
        })
        return {status: "successful delivery"}
    } catch(err){ 
        return err
    }
    
}

module.exports = sendMail