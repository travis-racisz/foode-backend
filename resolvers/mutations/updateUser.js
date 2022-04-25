const {sequelize} = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()
const updateUser = async (_, args, context) => { 
    // console.log(args)
    // check jwt token to make sure the user is logged in 
    // then use that users decoded info to see if they are updating their own account

    const user = jwt.verify(context.token, process.env.SECRET, function(err, decode){ 
        if(err){ 
            return new Error(err)
        }
        if(decode){ 
            return decode
        }
    })
    if(user.email === args.email){ 
        const updatedUser = await models.Users.update({ 
            streetAddress: args.streetAddress,
            buildingNumber: args.buildingNumber,
            firstName: args.firstName, 
            lastName: args.lastName, 
            roomNumber: args.roomNumber, 
            specialDirections: args.specialDirections
            
        }, { 
            where: {email: user.email},
            returning: true,
            plain: true
        })
        return updatedUser[1].dataValues
    }
}

module.exports = updateUser
