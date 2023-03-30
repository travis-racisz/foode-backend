const stripe = require('stripe')(process.env.STRIPESECRET)
const db = require("../../utils/firebaseConfig")
const createPaymentIntent = async (_, args, context) => {

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

