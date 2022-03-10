const {sequelize} = require('../utils/sequelize')
const {models} = sequelize
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPESECRET)
require('dotenv').config()
const loginOwner = async(_, args, context) => { 
    const owner = await models.Owners.findOne({ 
        where: { 
            email: args.email, 
        }, 
    })

    if(!owner){ 
        return new Error ("Unable to Login, please check credentials")
    }
    const isMatch = await bcrypt.compare(args.password, owner.dataValues.password)
    // console.log("still timed out")
    if(owner){ 
        if(owner.account_locked_until <= Date.now()){ 
            if(!isMatch){ 
                if(parseInt(owner.failed_login_attempts) >= 5){ 
                    owner.update({
                        account_locked_until: Date.now() + 3600000,
                        failed_login_attempts: 0
                    })
                    return new Error("Too many failed login attempts, Please try again in 1 hour or reset your password")
                }
                owner.increment("failed_login_attempts", {by: 1})
                return new Error("Incorrect email or password, please check credentials and try again")
            } 
            if(isMatch){ 
                // create token with a lifespan of 24 hours for the user to user in headers to make requests
                const token = jwt.sign(owner.dataValues, process.env.SECRET, { expiresIn:"24h" })
                const stripeAccount = await stripe.accounts.retrieve( 
                    owner.stripe_id
                )
                // when the owner logs in we should fetch all of the resturaunts that they own and see if they need any registration steps to be completed. 
                // and inform them of these problems.
                
                // if(stripeAccount.requirements.currently_due.length > 0){ 
                //     // if they do create an onboarding link for them to go to
                //     const accountLink = await stripe.accountLinks.create({ 
                //         account: owner.stripe_id, 
                //         refresh_url: "http://localhost:3000/",
                //         return_url: "http://localhost:3000/",
                //         type: "account_onboarding"
                //     })
                //     owner.update({ 
                //         failed_login_attempts: 0,
                //         account_locked_until: null
                //     })
                //     return accountLink
                // }
                owner.update({ 
                    failed_login_attempts: 0,
                    account_locked_until: null
                })
                return {
                    id: owner.dataValues.id,
                    email: owner.dataValues.email, 
                    token: token
                }
            }
        } 
    }
    return new Error("Your account is locked because of too many failed attempts to login, please try again later or reset your password")
}

module.exports = loginOwner