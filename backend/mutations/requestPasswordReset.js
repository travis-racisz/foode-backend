const { sequelize } = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
const transporter  = require('../mailer/mailerConfig')

const requestPasswordReset = async(_, args, context) => { 
    // look up the user and generate a token with their account info
    // send an email to the user with that token at the end of the url
    const user = await models.Owners.findOne({ 
        where: { 
            email: args.email
        }
    })
    console.log(user)
    if(!user){ 
        return {status: "email sent!"}
    }

    if(user){ 
        const token = jwt.sign(user.dataValues, process.env.SECRET, {expiresIn: "1h"})
        try{ 
            await transporter.sendMail({ 
                from: "tracisz14@gmail.com", // update this later with a business email
                to: args.email, 
                subject: "Password Reset", 
                text: `if you have not requested a password reset please ignore this message. to reset your password click this link  http://localhost:3000/reset/${token}`
            })
            return {status: "successful delivery"} 
        } catch(err){ 
            return err
        }
    }
}

module.exports = requestPasswordReset