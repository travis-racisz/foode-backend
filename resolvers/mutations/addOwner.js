const {sequelize} = require('../../utils/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPESECRET)
require('dotenv').config()
const addOwner = async (_, args, context) => { 
    // first take the password that is sent and hash it 
    // implement JWT to tokenize their account 
    function isStrong(value){ 
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,99}$/
        if(!regex.test(value)){ 
          throw new Error("Password must be at least 7 characters and include one number, one uppercase, and one lowercase")
        }
      }
      isStrong(args.password)
    const password = bcrypt.hashSync(args.password, 10)
    
    const newOwner = await sequelize.models.Owners.create({ 
        email: args.email,  
        password: password,
        role: "Admin",
        // need to figure out a better way to give owners permissions
    })

    

    const token = jwt.sign(newOwner.dataValues, process.env.SECRET, {expiresIn: "12h"})

    return {token: token}
    // console.log(newOwner.dataValues)

}

module.exports = addOwner

