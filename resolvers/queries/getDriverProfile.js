const { ApolloError } = require('apollo-server-core')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const getDriverProfile = async (_, args, context) => { 

    // takes jwt and the argument and returns account info based on that token 

    const profile = jwt.verify(args.token, process.env.SECRET, (err, decode) => { 
        if(err){ 
            console.log(err.message)
            throw new Error(err);
        }
        if(decode){ 
            return decode
        }
    })

    const driver = await models.Drivers.findOne({ 
        where: { 
            id: profile.id
        }
    })

    return driver
        
}

module.exports = getDriverProfile