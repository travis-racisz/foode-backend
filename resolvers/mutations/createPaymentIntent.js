const stripe = require('stripe')(process.env.STRIPESECRET)
const db = require("../../utils/firebaseConfig")
const createPaymentIntent = async (_, args, context) => {
    


    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor(args.total + (args.total * .27)),
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { 
            order_id: args.orderId
        }
    })

    const orderRef = db.collection('orders').doc(args.orderId)
    const updateWithPaymentIntent = await orderRef.update({
        paymentIntent: paymentIntent.id
    })
    return paymentIntent
}

module.exports = createPaymentIntent

