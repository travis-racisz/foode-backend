const {sequelize} = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')

const updateMenu = async (_, args, context) => { 
    // get the token and verify it 
    // check the users role
    // if its admin they can edit it
    // also check if that owner owns that resturuant by getting the menu 
    // then getting its resturauntID and check that against ownersJoin

    const verified = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
        if(err){ 
            return new Error(err)
        } 
        if(decoded){ 
            return decoded
        }
    })

        const menu = await models.Menus.findOne({ 
            where: { 
                id: args.menuId
            }
        })
        const checkOwner = await models.OwnersJoins.findOne({ 
            where: { 
                ownerId: verified.id,
                resturauntId: menu.dataValues.ResturauntId
            }
        })

        if(!checkOwner){ 
            return new Error("Permisson Denied")
        }
        if(checkOwner){ 
            if(verified.role === "Admin"){ 
                menu.update(args)
            }
        }


}

module.exports = updateMenu