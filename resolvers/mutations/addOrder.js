const {sequelize} = require("../../utils/sequelize")
const db = require("../../utils/firebaseConfig")
const {models} = sequelize
const stripe = require('stripe')(process.env.STRIPESECRET)
const jwt = require('jsonwebtoken')
const { session } = require("passport/lib")
const { Op } = require("sequelize/dist")
const addOrder = async (_, args, context) => { 
    // first charge the user, update status
    // then add order to database
    // then we bulk add order Items to the database, using the OrderId
    // then bulk add comboItems to the database, using the OrderId, 
    // then join the three tables, and you have your order details
    // then find a driver, update status
    // then make request to resturaunt to get order approved, update status
    console.log(args, "args")
    const restaurant = await models.Resturaunts.findOne({ 
        where: { 
            id: args.RestaurantId
        }
    })

    const orderRef = db.collection('orders').doc(args.orderId)
    // console.log(orderRef, "orderRef")
    const unsubscribe = orderRef.onSnapshot(async snapShot => { 
        const timeout = setTimeout(() => { 
            // console.log("order timed out")
            
            orderRef.update({status: "canceled"})
            return {status: "canceled"}
        }, 360 * 1000)
        if(snapShot.status === "accepted"){
            const transferToRestaurant = await stripe.transfers.create({
                amount: (args.total - (args.total * .27)),
                currency: "usd",
                destination: restaurant.stripe_id,
            })
            
            clearTimeout(timeout) 
            unsubscribe()
            return { status: "accepted" }
        }
        // console.log(snapShot, "snapShot")

    })
    
    // const user = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
    //     if(err){ 
    //         throw new Error(err)
    //     }
    //     if(decoded){ 
    //         return decoded
    //     }
    // })
    // console.log(args)
    // //figure out who to transfer the money to, by getting the menu, then resturaunt, then the owner and use their stripe ID to transfer the money
    // // const menu = await models.Menus.findOne({ 
    // //     where: { 
    // //         id: args.menuItems[0].menu_id
    // //     }
    // // })

    
    

    // const menuItems = await models.MenuItems.findAll({ 
    //     where: { 
    //         id: { 
    //             [Op.in]: args.ids
    //         }
    //     }
    // })

    

    const paymentIntent = await stripe.paymentIntents.create({ 
        amount: args.total * .27, 
        currency: "usd", 
        payment_method_types: ["card"],
    })
    // // const owner = await models.OwnerJoins.findOne({ 
        
    // // })
    
    // const priceData = args.menuItems.map(item => ({price: item.priceId, quantity: 1}))
    // const orderPrice = args.menuItems.map(item => item.price * item.qty)
    // const reduced = orderPrice.reduce((prev, curr) => prev + curr) // this is the price of the entire order, add the cost of delivery to it
    // console.log(reduced - reduced * 0.27)
    // // this is where we would implement stripe to charge the user, skip for now
    // const session = await stripe.checkout.sessions.create({ 
    //     success_url: "http://localhost:3000/",
    //     cancel_url: "http://localhost:3000/canceled",
    //     line_items: priceData, 
    //     mode: "payment",
    //     payment_intent_data:{ 
    //         transfer_group: "{ORDER}"
    //     }, 
    //     metadata: { 
    //         destination: resturaunt.stripe_id, 
    //         amount: reduced - (reduced * .27), 
    //         user_id: user.id,
    //         status: "pending",
    //         specialRequest: args.specialRequest,
        
    //     }
    // })


    
    // console.log(session.url)
    // add the order to the database
 
    // const price = args.menuItems.reduce((prev, curr) => prev.price + (curr.price * curr.qty))
    // console.log(price)
   
    
    // now bulkInsert the menuItems

    // console.log(args.menuItems, "menuItems argurment")
   

    // console.log(newOrder)
    
    
}


module.exports = addOrder