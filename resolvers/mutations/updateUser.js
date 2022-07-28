const {sequelize} = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()
const updateUser = async (_, args, context) => { 
    console.log(args)
    // check jwt token to make sure the user is logged in 
    // then use that users decoded info to see if they are updating their own account
    const user = jwt.verify(args.token, process.env.SECRET, function(err, decode){ 
        if(err){ 
            console.log(err, 'err')
            throw new Error(err)
        }
        if(decode){ 
            console.log(decode, 'decode')
            return decode
        }
    })
    
    const updatedUser = await models.Users.update({ 
        ...args
        
    }, { 
        where: {email: user.email},
        returning: true,
        plain: true
    })
    console.log(updatedUser, 'updatedUser')
    // return updatedUser.dataValues
    return updatedUser.dataValues
}
    

module.exports = updateUser
