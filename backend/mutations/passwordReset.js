const { sequelize } = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const passwordReset = async(_, args, context) => { 
    // first we need to request a password reset and create a unique token on the users account that will then be emailed to them 
    // the front end will then send that unqiue token to the backend by cliicking the link in the email 
    // the back end will check that token against the user
    // then if it all matches use the password that it sent
    // hash it, then update the user with a new password
    const user = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
        if(err){ 
            throw new Error(err)
        }
        if(decoded){ 
            return decoded
        }
    })
    
    const checkOwner = await models.Owners.findOne({ 
        where: { 
            email: user.email,
        }
    })

    const checkDriver = await models.Drivers.findOne({ 
        where: { 
            email: user.email
        }
    })

    if(checkOwner){ 
        const password = bcrypt.hashSync(args.password, 10)
        await checkOwner.update({ 
            password: password,
            account_locked_until: null, 
            failed_login_attemps: 0
        })
        return {status: "password changed succesfully"}
    }


}

module.exports = passwordReset