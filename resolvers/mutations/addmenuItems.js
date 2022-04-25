const { sequelize } = require('../../utils/sequelize')
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
            try{ 
                const newPrice = await stripe.prices.create({ 
                    currency: 'usd',
                    unit_amount: args.price, 
                    product_data: { 
                        name: args.name,
                        active: true
                    }
    
                })
                if(newPrice){ 
                    const newMenuItem = await models.MenuItems.create({...args, priceId: newPrice.id})
                    args.optionsGroup.forEach(async(option) => {
                        console.log(option, "options")
                        try{ 
                            const newOptionsGroup = await models.OptionsGroups.create({ 
                                name: option.name,
                                description: option.description, 
                                numberOfChoices: option.numberOfChoices,
                                menuItem_id: newMenuItem.id
                            })
                            console.log(newOptionsGroup, "newOptionsGroup")
                            if(newOptionsGroup){
                                console.log(newOptionsGroup, "newOptionsGroupnext")
                                option.options.forEach(async(option) => { 
                                    console.log(option, "option.option")
                                    try{ 
                                        const newOptionPrice = await stripe.prices.create({ 
                                            currency: 'usd', 
                                            unit_amount: option.value,
                                            product_data: { 
                                                name: option.name, 
                                                active: true
                                            }
                                        })
                                        try{ 
                                            const newOptions = await models.Options.create({ 
                                                name: option.name,
                                                value: option.value, 
                                                description: option.description,
                                                optionsGroup_id: newOptionsGroup.id,
                                                priceId: newOptionPrice.id
                                            })
                                            console.log(newOptions)
                                                
            
                                        } catch(err){ 
                                            console.log(err)
                                            return new Error(err)
                                        }
                                    } catch(err){
                                        console.log(err)
                                        return new Error(err)
                                    }
                                    
                                    
                                })
                                
                            }
    
                        } catch(err){ 
                            console.log(err)
                            return new Error(err)
                        }
                        
                    })
                    
                    return newMenuItem.dataValues
            }

            } catch(err){ 
                return new Error(err)
            }
            
            
        return new Error("permission denied")
    }


    return new Error('permission denied')


    }
}

module.exports = addMenuItems