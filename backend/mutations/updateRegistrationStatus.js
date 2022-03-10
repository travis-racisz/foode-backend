const { sequelize } = require('../utils/sequelize')
const { models } = sequelize
const stripe = require('stripe')(process.env.STRIPESECRET)

const updateRegistrationStatus = async (_, args, context) => { 
    // this will be called from the front end upon completion of the account onboarding 
    // first we will get their stipe account ID and check if charges_enabled is true 
    // if so we update the completed_registration field in postgres to true
    // else we just return 
    // on login we can check if the owner has any restaurants that require any additional steps, 
    // if so we can generate a new account link for them and using UI elements tell them they need 
    // to finish registering the restaurant before itll be available to customers
    // also when we get resturants we can just get all with complete_registrations 

    // step 1.) front end returns restaurant information, make a call to stripe to check the status of the restaurant, 
    // step 2.) return if the completed_registion is true, then update UI elements on the front end accordingly 

    const account = await stripe.accounts.retrieve(args.stripe_id)

    // check if the registration completed by retreiving their account and check for charges_enabled 
    // https://stripe.com/docs/connect/express-accounts#handle-users-not-completed-onboarding
    if(account.charges_enabled){ 
        const restaurant = await models.Resturants.findOne({ 
            where: { 
                stripe_id: args.stripe_id
            }
        })
       const updatedRestaurant = restaurant.update({ 
            completed_registration: true
        })
        return updatedRestaurant
    }
}