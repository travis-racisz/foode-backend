const {sequelize} = require("../utils/sequelize")
const {models} = sequelize
const stripe = require('stripe')(process.env.STRIPESECRET)
const jwt = require('jsonwebtoken')
const addOrder = async (_, args, context) => { 
    // first charge the user, update status
    // then add order to database
    // then we bulk add order Items to the database, using the OrderId
    // then bulk add comboItems to the database, using the OrderId, 
    // then join the three tables, and you have your order details
    // then find a driver, update status
    // then make request to resturaunt to get order approved, update status
    
    // const user = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
    //     if(err){ 
    //         throw new Error(err)
    //     }
    //     if(decoded){ 
    //         return decoded
    //     }
    // })
    console.log(args)
    //figure out who to transfer the money to, by getting the menu, then resturaunt, then the owner and use their stripe ID to transfer the money
    const menu = await models.Menus.findOne({ 
        where: { 
            id: args.menuItems[0].menu_id
        }
    })

    console.log(menu)
    const resturaunt = await models.Resturaunts.findOne({ 
        where: { 
            id: menu.dataValues.ResturauntId
        }
    })

    // const owner = await models.OwnerJoins.findOne({ 
        
    // })
    console.log(resturaunt)
    
    const priceData = args.menuItems.map(item => ({price: item.priceId, quantity: item.qty}))
    const orderPrice = args.menuItems.map(item => item.price * item.qty)
    const reduced = orderPrice.reduce((prev, curr) => prev + curr) // this is the price of the entire order, add the cost of delivery to it
    console.log(reduced - reduced * 0.27)
    // this is where we would implement stripe to charge the user, skip for now
    const session = await stripe.checkout.sessions.create({ 
        success_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/canceled",
        line_items: priceData, 
        mode: "payment",
        payment_intent_data:{ 
            transfer_group: "{ORDER}"
        }, 
        metadata: { 
            destination: resturaunt.stripe_id, 
            amount: reduced - (reduced * .27)
        }
    })


    
    // console.log(session.url)
    // add the order to the database
 
    // const price = args.menuItems.reduce((prev, curr) => prev.price + (curr.price * curr.qty))
    // console.log(price)
    const {dataValues: newOrder} = await models.Orders.create({ 
        user_id: user.id, 
        status: args.status, 
        specialRequests: args.specialRequests, 
        price: session.amount_total
    })
    
    // now bulkInsert the menuItems

    // console.log(args.menuItems, "menuItems argurment")
    const menuItemsMap = args.menuItems.map(item => ({...item, order_id: newOrder.id}))
   console.log(menuItemsMap)
    const menuItems = await models.OrderItems.bulkCreate(menuItemsMap)

    // console.log(newOrder)
    console.log(menuItems)
    return {url: session.url}
    
}


module.exports = addOrder