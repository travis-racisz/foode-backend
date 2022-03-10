const {sequelize} = require('sequelize')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const updateOwner = async (_, args, context) => { 
    // first check the header to see if the token matches the user that they are trying to update
    // then send the updates
    const user = jwt.verify(context.token, process.env.SECRET, function(err, decode){ 
        if(err){ 
            return new Error(err)
        } 
        if(decode){ 
            return decode
        }
    })
    
    if(args.email === user.email){ 
        // searched owner matches request of logged in user
        // users can only update their own accounts
        // need to update the ownerJoins table with the Owner ID and the resturaunt that they own.
        // -- note at later date, Might not need to update ownerjoins table
        // -- it would be weird to be able to update an account with a new resturaunt
        // -- unless a user wants to add someone that already has one resturaunt to a new resturaunt
        // might make this a seperate mutation so it can be managed by an admin in the future. 

        const updatedOwner = await sequelize.models.Owners.update(args)
        return updatedOwner.dataValues
    }
}

module.exports = updateOwner