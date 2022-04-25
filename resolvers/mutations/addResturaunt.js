const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPESECRET)

const addResturaunt = async(_, args, context) => { 
    // replace secret with env variable 
    const verified = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
        if(err){ 
            return new Error(err)
        } 
        if(decoded){ 
            return decoded
        }
    })


    if(verified.role === "Admin"){ 
        const stripeOwner = await stripe.accounts.create({ type: 'express', email: verified.email, metadata: { resturant: args.name }}) 
        
    
        const accountLink = await stripe.accountLinks.create({ 
            account: stripeOwner.id, 
            refresh_url: "http://localhost:3000/",
            return_url: "http://localhost:3000/", // should make routes for this
            type: "account_onboarding"
        })



        const newResturaunt = await models.Resturaunts.create({ 
            name: args.name, 
            baseId: args.baseId, 
            openingHour: args.openingHour, 
            closingHour: args.closingHour,
            stripe_id: stripeOwner.id, 
            completed_registration: false
        })
        
        const newJunction = await models.OwnersJoins.create({ 
            ownerId: verified.id, 
            resturauntId: newResturaunt.dataValues.id
        })
        return {url: accountLink.url, ...newResturaunt.dataValues}
   
        


    } 

    return new Error("Permission denied")



}

module.exports = addResturaunt

