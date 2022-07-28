const {sequelize} = require('../../utils/sequelize')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// console.log(process.env['FACEBOOK_CLIENT_ID'], 'cliendID')



const addUser = async (_, args) => { 
    console.log(args)
    // first attempt to get the use from the database
    // if there is no user, create one
 
   const foundUser = await sequelize.models.Users.findOne({ 
        where: {
            email: args.email
        }
    })
    if(!foundUser || foundUser === undefined){ 
       const {dataValues: createdUser} = await sequelize.models.Users.create({ 
            email: args.email, 
        })
        console.log(createdUser)
        const token = jwt.sign(createdUser, process.env.SECRET, {expiresIn: "24h"})
        return {createdUser, token}
    }  else { 
        const token = jwt.sign(foundUser.dataValues, process.env.SECRET, {expiresIn: "24h"})
        return { 
            foundUser, 
            token
        }
    }

}

module.exports = addUser