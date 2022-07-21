const {sequelize} = require("../../utils/sequelize")
const db = require("../../utils/firebaseConfig")
const {models} = sequelize
const stripe = require('stripe')(process.env.STRIPESECRET)


const addOrder = async (_, args, context) => { 
    // first charge the user, update status
    // then add order to database
    // then we bulk add order Items to the database, using the OrderId
    // then bulk add comboItems to the database, using the OrderId, 
    // then join the three tables, and you have your order details
    // then find a driver, update status
    // then make request to resturaunt to get order approved, update status
    const restaurant = await models.Resturaunts.findOne({ 
        where: { 
            id: args.RestaurantId
        }
    })

    console.log(args.total + (args.total * .27), "args.total + (args.total * .27)")
    const newOrder = await db.collection("orders").add({
        status: "pending",
        total: args.total + (args.total * .27),
        RestaurantId: args.RestaurantId,
        orderDetails: args.order,
    })
   

    const orderRef = db.collection('orders').doc(newOrder.id)
    // console.log(orderRef, "orderRef")
    const timeout = setTimeout(() => { 
        console.log("order timed out")

        
        orderRef.update({status: "canceled"})
        unsubscribe()
        
    }, 60 * 1000)
    const unsubscribe = orderRef.onSnapshot(async snapShot => { 
        
        switch(snapShot.data().status){ 
            case "accepted": 
                clearTimeout(timeout) 
                // const transferToRestaurant = await stripe.transfers.create({
                //     amount: (args.total - (args.total * .27)),
                //     currency: "usd",
                //     destination: restaurant.stripe_id,
                // })
                unsubscribe()
                break
            
            default: 
                console.log("default")
                break
        }
            // const transferToRestaurant = await stripe.transfers.create({
            //     amount: (args.total - (args.total * .27)),
            //     currency: "usd",
            //     destination: restaurant.stripe_id,
            // })
            
            
        
        // console.log(snapShot, "snapShot")

    })

    const listenerForOrderUpdates = orderRef.onSnapshot(async snapShot => { 
        if(snapShot.data().status === "canceled"){

            // email the user that their order has been canceled
            // no need to refund them because they didn't pay
            console.log("canceled order no need for refund no drivers available")
            // refund the customer
            // const refund = await stripe.refunds.create({
            //     payment_intent: snapShot.data().paymentIntent,
            // })
            listenerForOrderUpdates()
        }
    })




    return { 
        orderId: newOrder.id, 
    }
    
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