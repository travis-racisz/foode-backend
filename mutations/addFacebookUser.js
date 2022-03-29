const {sequelize} = require('../utils/sequelize')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// console.log(process.env['FACEBOOK_CLIENT_ID'], 'cliendID')



const addUser = async (_, user) => { 
    // first attempt to get the use from the database
    // if there is no user, create one
 
   const foundUser = await sequelize.models.Users.findOne({ 
        where: {
            email: user.email
        }
    })
    if(!foundUser || foundUser === undefined){ 
       const {dataValues: createdUser} = await sequelize.models.Users.create({ 
            name: user.name, 
            roles: user.roles, 
            token: user.token, 
            email: user.email, 
        })
        console.log(createdUser)
        const token = jwt.sign(createdUser, process.env.SECRET, {expiresIn: "24h"})
        return {createdUser, token}
    } 

        const token = jwt.sign(foundUser.dataValues, process.env.SECRET, {expiresIn: "24h"})
        return { 
            foundUser, 
            token
        }
}

module.exports = addUser