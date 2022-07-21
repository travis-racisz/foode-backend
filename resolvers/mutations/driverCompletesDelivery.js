const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const db = require("../../utils/firebaseConfig")
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPESECRET)
const { pubsub } = require('../../utils/sequelize')
const driverCompletesDelivery = async (_, args, context) => { 
    // get the order related to the driver
    // update the status as delivered
    // allow the driver to accept a new order
    // pay out the driver for the amount they are owed 

    console.log(args)
    const user = jwt.verify(args.token, process.env.SECRET, (err, decoded) => { 
        if(err){ 
            throw new Error(err)
        }
        if(decoded){ 
            return decoded
        }
    })

    // console.log(user, 'user')

    const driver = await models.Drivers.findOne({ 
        where: { 
            id: user.id
        }
    })
    
    // const order = models.Orders.findOne({ 
    //     where: { 
    //         id: args.orderId
    //     }
    // })

    const orderRef = db.collection('orders').doc(args.orderId)
    const orderData = await orderRef.get()
    console.log(orderData.data())
    const paymentIntent = await stripe.paymentIntents.retrieve(orderData.data().paymentIntent)
    console.log(paymentIntent)
    // calculate how much goes to the driver
    if(paymentIntent.metadata.completed){ 
        return new Error("Transaction already completed")
    }
    const driversPay = Math.floor((paymentIntent.metadata.driversFee))
    const transfer = await stripe.transfers.create({ 
        amount: driversPay, 
        destination: driver.stripe_id, 
        currency: 'usd', 
        metadata: { 
            driver: driver.email, 
            completed: true
        }
    })
    await stripe.paymentIntents.update(paymentIntent.id, { 
        metadata: { 
            completed: true
        }
    })

    if(!transfer){ 
        return { 
            status: "error"
        }
    }
    const updateOrder = await orderRef.update({status: "completed"})

    // const updatedOrder = await order.update({ 
    //     status: "Completed"
    // })


    const updatedDriver = await driver.update({ 
        currentlyDelivering: false
    })



    return {status: "success"}





}

module.exports = driverCompletesDelivery