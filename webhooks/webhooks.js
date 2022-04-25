const express = require(express)
const { app } = require('./expressServer')
const stripe = require('stripe')(process.env.STRIPESECRET)

const endpointSecret = "whsec_69f99a03c0b3437bb9594083c3c5474232a817317de3138264ca12a9ae358db4";

    let charge
 
    app.use('/webhooks', express.raw({type: 'application/json'}), async (request, response) => {
        const sig = request.headers['stripe-signature'];
            console.log('webhook fired')
            // console.log(request.body)
            // get the customer by ID then email them a reciept 
        let event;
        let metadata;
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        // console.log(event.type)

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            console.log(
                "stripe webhook fired"
                )
            break
            case 'charge.succeeded': 
                console.log(event.data.object)
                 charge = event.data.object.id
            break
            case 'checkout.session.completed': 
            const {dataValues: newOrder} = await sequelize.models.Orders.create({ 
                user_id: event.data.object.metadata.user_id, 
                status: event.data.object.metadata.status, 
                specialRequests: event.data.object.metadata.specialRequests, 
                
            })
            
                console.log("Checkout session completed")
                console.log(event.data.object.metadata)  
                await stripe.transfers.create({ 
                    amount: event.data.object.metadata.amount, // some amount of money need to get the total price and do some math
                    currency: "usd", 
                    destination:event.data.object.metadata.destination, 
                    source_transaction: charge,
                    // transfer_group: "{ORDER}"
                }) 
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
            // ... handle other event types
            default:
            console.log(`Unhandled event type ${event.type}`)
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send()
    })