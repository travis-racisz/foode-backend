const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()
const updateMenuItems = async(_, args, context) => { 
    // check the token for validity
    // Owner has a resturaunt 
    // a resturaunt has a menu
    // menus have menuItems 

    const user = jwt.verify(context.token, process.env.SECRET, function(err, decode){ 
        if(err){ 
            return new Error(err)
        }
        if(decode){ 
            return decode
        }
    })
    console.log(user)

    // we have the user now get the resturaunt that user owns and then the menus
    // see if the menuItem has an id that is in menus

    if(!user){ 
        return new Error('permisson denied')
    }
    // get the item we are editing
    const menuItem = await models.MenuItems.findOne({ 
        where: { 
            id: args.menuItemId
        }
    })
    // get the menu that is associated with the menuItem that we are editing 
    const menu = await models.Menus.findOne({ 
        where: { 
            id: menuItem.dataValues.id
        }
    })

    console.log(menu)

    // check if the person making the request is an owner of the resturuant that that item belongs to
    const userResturaunts = await models.OwnersJoins.findAll({ 
        where: { 
            ownerId: user.id,
            resturauntId: menu.dataValues.ResturauntId
        }
    })

    // kinda messy but checks if the user is an admin and if they own that resturaunt before editing the item
    if(user.role === "Admin"){
        if(userResturaunts.length !== 0){ 
            menuItem.update(args)
            return menuItem.dataValues
        }
         return new Error("permission denied")
    } else { 
        return new Error("permission denied")
    }
}

module.exports = updateMenuItems