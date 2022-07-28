const jwt = require('jsonwebtoken')
const {sequelize} = require('../../utils/sequelize')
const { models } = sequelize
require('dotenv').config()
const getUserProfile = async (_, args ) => { 
    console.log(args, 'args')
    const user = jwt.verify(args.token, process.env.SECRET, (err, decoded) => { 
        if(err){ 
            console.log(err, 'err')
            return new Error(err)
        } 

        if(decoded){ 
            console.log(decoded, 'decoded')
            return decoded
        }
    })

    const foundUser = await models.Users.findOne({ 
        where: { 
            email: user.email
        }
    })

    console.log(foundUser, 'foundUser')

    return foundUser.dataValues
}

module.exports = getUserProfile