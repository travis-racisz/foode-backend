const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const bcrypt = require('bcrypt')
const stripe = require('stripe')(process.env.STRIPESECRET);
const sendmail = require("../../mailer/mailer.js");
const jwt = require('jsonwebtoken');
    // should move this to an env var for production
    
    
    const addDrivers = async(_, args, context) => { 
        // first take the password and hash it 
        // then create an account for the driver in stripe
        // then save all of the details in the database 
        function isStrong(value){ 
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,99}$/
            if(!regex.test(value)){ 
              throw new Error("Password must be at least 7 characters and include one number, one uppercase, and one lowercase")
            }
          }
          isStrong(args.password)
        const account = await stripe.accounts.create({type: 'express', email: args.email});
        const password = bcrypt.hashSync(args.password, 10)
        const newDriver = await models.Drivers.create({ 
            email:args.email, 
            password: password, 
            stripe_id: account.id,
            // firstName: args.firstName, 
            // lastName: args.lastName
        })

        // send an email to the user to verify their account, then route them to their onboarding account link
        const signature = jwt.sign(newDriver, process.env.SECRET, {expiresIn: "2h"})
        sendmail(_, args.email, process.env.EMAIL, "Verify Email", `click here to verify your account http://localhost::8175/verify/${signature}`)
        // create an account link to get the user to finish their onboarding
        const accountLink = await stripe.accountLinks.create({ 
            account: account.id, 
            refresh_url: "http://localhost:3000/",
            return_url: "http://localhost:3000/",
            type: "account_onboarding"
        })
        return accountLink
}

module.exports = addDrivers