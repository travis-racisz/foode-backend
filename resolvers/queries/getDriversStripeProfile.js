const stripe  = require('stripe')(process.env.STRIPESECRET)
const getDriversStripeProfile = async(_, args,context ) => { 
    console.log(args, 'stripe account args')
    const loginLink = await stripe.accounts.createLoginLink(
        args.stripeAccount
    )

    return {url: loginLink.url}
}


module.exports = getDriversStripeProfile