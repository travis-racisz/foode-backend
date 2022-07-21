const stripe = require('stripe')(process.env.STRIPESECRET)
const db = require("../../utils/firebaseConfig")
const createPaymentIntent = async (_, args, context) => {
    console.log(args, 'args')

    // calculate the amount on the backend, args needs to accept an array of objects then loop through the objects to get the amount
    // was already done on the front end shouldnt be too hard 

    // function getOptionsTotal(cart){ 
    //     const cartOptions = []
    //     if( cart.length > 0 ) { 
    //         cart.forEach(item => { 
    //             if(item.options){ 
    //                 item.options.forEach((item) => { 
    //                     cartOptions.push(item.value)
    //                 })
    //             }
    //         })
    //     }
    //     const optionsTotal = cartOptions.reduce((prev, acc) => prev + acc)
    //     return optionsTotal
    // }

    // function getCartItemsTotal(cart){ 
    //     const cartTotal = cart.reduce((prev, acc) => { 
    //         prev + acc.price
    //     })
    //     return cartTotal
    // }
    
    // console.log(getCartItemsTotal(args.cart), "cart total")
    // console.log(getOptionsTotal(args.cart), "options total")

    const driversFee = args.total * .2
    const platformFee = (args.total + driversFee) * .07
    console.log("driversFee: ", driversFee, "platform fee: ", platformFee, "total: ", args.total, "everything added together: ", args.total + driversFee + platformFee )


    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor(args.total + driversFee + platformFee),
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { 
            order_id: args.orderId, 
            driversFee: driversFee
        }
    })

    const orderRef = db.collection('orders').doc(args.orderId)
    const updateWithPaymentIntent = await orderRef.update({
        paymentIntent: paymentIntent.id
    })
    return paymentIntent
}

module.exports = createPaymentIntent

