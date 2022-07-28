const sequelize = require("sequelize")
const { models } = sequelize
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const drivers = require("../../models/drivers")

const loginUser = (args) => { 
    // take user args, find them in the database
    // check if password is a match 
    // if so return JWT with their credentials
    // allow failed logins 5 times then lock their account for one hour
    
    // find user in database 
    const user = await models.findOne({
        where: { 
            email: args.email
        }
    })

    // user is not found
    if(!user){ 
        return new error("Email or password is incorrect")
    }

    if(user.account_locked_until <= Date.now()){ 
        const isMatch = await bcrypt.compare(args.password, user.password)
        if(!isMatch){ 
            if(parseInt(user.failed_login_attempts) >= 5){ 
                user.update({ 
                    account_locked_until: Date.now() + 3600000, 
                    failed_login_attempts: 0
                })
            }
            drivers.increment('failed_login_attempts', { 
                by:1
            })
            throw new Error('Email or password is incorrect')
        }
        if(isMatch){ 
            const token = jwt.sign(user.dataValues, process.env.SECRET, { expiresIn: '12h'})
            return {token: token}
        }
    }

}