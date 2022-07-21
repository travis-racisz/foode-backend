const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const stripe = require('stripe')(process.env.STRIPESECRET)
const loginDrivers = async (_, args, context) => { 
    // find user in database based on email 
    // compare hashed password to hased argument password
    // if they match sign the user with jwt and return that
    console.log(args, 'args in auth')

    const driver = await models.Drivers.findOne({ 
        where: {email: args.email}, 
    })

    
    if(!driver){ 
        throw new Error("Email or password is incorrect please try again")
    }

    if(driver.account_locked_until <= Date.now()){ 
        const isMatch = await bcrypt.compare(args.password, driver.password)
        if(!isMatch){ 
            if(parseInt(driver.failed_login_attempts) >= 5){ 
                driver.update({ 
                    account_locked_until: Date.now() + 3600000,
                    failed_login_attempts: 0
                })
            }
            driver.increment("failed_login_attempts", {by: 1})
            throw new Error("Email or password is incorrect please try again")
        } 
        if(isMatch){ 
            console.log('ismatch')
            
            const token = jwt.sign(driver.dataValues, process.env.SECRET, {expiresIn: '12h'})
            const stripeAccount = await stripe.accounts.retrieve( 
                driver.dataValues.stripe_id
            )
            
            // check if the account has any required actions
            if(stripeAccount.requirements.currently_due.length > 0){ 
                // if they do create an onboarding link for them to go to
                const accountLink = await stripe.accountLinks.create({ 
                    account: driver.dataValues.stripe_id, 
                    refresh_url: "http://localhost:3000/",
                    return_url: "http://localhost:3000/driver/dashboard",
                    type: "account_onboarding"
                })
                return {url: accountLink.url, token: token} 
            }
            return {token: token}
        }
    }





}

module.exports = loginDrivers