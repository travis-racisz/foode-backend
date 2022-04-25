const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()
const addMenu = async(_, args, context) => { 
    // first we need to check token to make sure this person is an admin
    // and we need to make sure they own that resturaunt they are adding this menu to
    const user = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
        if(err){ 
            throw new Error(err.message)
        }
        if(decoded){ 
            return decoded
        }
    })

    console.log(user)

    // check if they own the resturant they are adding this menu to
    const isOwnedByUser = await models.OwnersJoins.findAll({ 
        where: { 
            ownerId: user.id, 
            resturauntId: args.resturauntId
        }
    })

    if(isOwnedByUser.length === 0 ){ 
        return new Error("permission denied")
    }
    // they own the resturaunt, they can add a menu if they are an admin
    if(user.role === "Admin"){ 
        const addedMenu = await models.Menus.create({ 
            name: args.name, 
            ResturauntId: args.resturauntId, 
            openingHour: args.openingHour, 
            closingHour: args.closingHour
        })
        return addedMenu.dataValues

    } else { 
        return new Error("permission denied")
    }


}

module.exports = addMenu