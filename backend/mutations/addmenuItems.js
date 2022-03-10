const { sequelize } = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPESECRET)
require('dotenv').config()
const cloudinary = require('cloudinary').v2

const addMenuItems = async (_, args, context) => { 
    // first check token to make sure its legit, 
    // then make sure the person has the correct permissions to add menuItems with that menuId

    const user = jwt.verify(context.token, process.env.SECRET, function(err, decode){ 
        if(err){ 
            return new Error(err)
        } 
        if(decode){ 
            return decode
        }
    })



    // the token has been verified now check if user owns the resturaunt they're adding this item to
    // get the menu for the item we are adding 
    const menu = await models.Menus.findOne({ 
        where: { 
            id: args.menu_id
        }
    })
    
    
    // now check if that person owns that resturaunt 
    const resturaunt = await models.OwnersJoins.findOne({ 
        where: { 
            ownerId: user.id, 
            resturauntId: menu.dataValues.ResturauntId 
        }
    })
    
    
    // check if any resturaunts were returned meaning the owner and the menu match
    // check if they are an admin
    // add the menuItem 

    if(resturaunt){ 
        if(user.role === "Admin"){ 
            // need to add the MenuItem as a product object in stripe dashboard
            // const newProduct = await stripe.products.create({
            //     name:args.name,
            //     description: args.description
            // })
            const newPrice = await stripe.prices.create({ 
                currency: 'usd',
                unit_amount: args.price, 
                product_data: { 
                    name: args.name,
                    active: true
                }

            })
            if(newPrice){ 
                console.log(newPrice)
                const newMenuItem = await models.MenuItems.create({...args, priceId: newPrice.id})
                return newMenuItem.dataValues
            } 
            }
        return new Error("permission denied")
    }

    return new Error('permission denied')


}

module.exports = addMenuItems