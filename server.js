const {ApolloServer, gql} = require('apollo-server-express')
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const  express = require('express')
const http = require('http')
const {TagJoin, OwnersJoin, Owners } = require('./utils/sequelize')
const {Menus, MenuItems} = require('./utils/sequelize.js')
const Combos = require("./models/combos")
const {sequelize} = require("./utils/sequelize")
const DataLoader = require('dataloader')
const {Op} = require('sequelize')
const addUser = require('./mutations/addFacebookUser')
const sendMail = require('./mailer/mailerConfig')
const getLink  = require('./queries/getLink')
const updateUser = require("./mutations/updateUser")
const addOwner = require('./mutations/addOwner')
const addResturaunt = require('./mutations/addResturaunt')
const loginOwner = require('./mutations/loginOwner')
const updateMenu = require('./mutations/updateMenu')
const updateMenuItems = require('./mutations/updateMenuItems')
const addMenu = require('./mutations/addMenu')
const addMenuItems = require('./mutations/addmenuItems')
const stripe = require('stripe')(process.env.STRIPESECRET)
const addOrder = require('./mutations/addOrder')
const getOrders = require('./queries/getOrders')
const addDrivers = require('./mutations/addDrivers')
const loginDrivers = require('./mutations/loginDrivers')
const getAllOrders = require('./queries/getAllOrders')
const driverAcceptsOrder = require('./mutations/driverAcceptOrder')
const jwt = require('jsonwebtoken')
const { pubsub } = require('./utils/sequelize')
const requestPasswordReset = require('./mutations/requestPasswordReset')
const passwordReset = require('./mutations/passwordReset')
const driverCompletesDelivery = require('./mutations/driverCompletesDelivery')

    


    const loader = { 
        // make a dataloader for the batch request to get all resturaunts and their menus to shorten the amount of db queries you need to do.
        resturaunts: new DataLoader(async (ids) => { 
            // console.log(ids)
            const rows = await sequelize.models.Resturaunts.findAll({
                where: {id:ids}
            })
    
            const lookup = rows.reduce((acc, row) => { 
                acc[row.id] = row
                return acc
            }, {})

            // console.log(lookup)

            return ids.map(id => lookup[id] || null)
        }), 

        menus: new DataLoader(async ([ids]) => { 
                const menus = await sequelize.models.Menus.findAll({ 
                    where: { 
                        id: ids
                    }
                })

                const menuMap = {}

                menus.map(m => { 
                   return menuMap[m.id] = m
                })
                
                return ids.map(id => menuMap[id] || null)
        }), 

        menuItems: new DataLoader(async ([ids]) => { 
            console.log(ids)

            const itemMap = {}
            
            const result = await sequelize.models.MenuItems.findAll({ 
                where: {id: {[Op.in]: ids}}
            })
            result.forEach((item) => { 
                
                itemMap[item.id] = item.dataValues
            })

            return ids.map(key => itemMap[key][0])

            // const returnValue = Promise.resolve(ids.map(key => itemMap[key]))


            //     // ids.map(key => console.log(itemMap[key]))
            //     // console.log(itemMap)
            //     const test = ids.map(key => itemMap[key])
            //     console.log(test)
            //     return Promise.all([itemMap])
            
                // rows.map((item) => { 
                //     // console.log(item)
                //     return itemMap[item.id] = item
                // })

                // console.log(mappedItems)
            //     // console.log(itemMap)
            // console.log(ids.map(id => itemMap[id]))
            // return ids.map(id => itemMap[id])
        })
        
    }






const typeDefs = gql`   
    type Menu { 
        id: ID, 
        name: String, 
        ResturauntId: ID, 
        MenuItems: [MenuItems],
        resturaunt: Resturaunt,
    }
    
    type SessionURL { 
        url: String
    }

    
    type Order{ 
        id:ID, 
        user_id: String, 
        OrderItems: [OrderItems],
        User: User
        status: String,
        price: Int
    }

    type OrderItems{ 
        id: ID, 
        name: String, 
        price: Int,
        order_id: Int,
        description: String,
        qty: Int,
    }

    type MenuItems{
        id: ID, 
        name: String, 
        menu_id: ID, 
        price: Int, 
        priceId: String,
        description: String,
        available: Boolean, 
        category: String
    }
    
    input InputMenuItems{
        id: ID, 
        name: String,  
        price: Int, 
        qty: Int,
        size: String,
        priceId: String,
        menu_id: Int

    }
    
    type Tag { 
        id: ID,
        tag: String,
        menuItems: [MenuItems]
    }

    type Owner { 
        id: ID, 
        email: String, 
        token: String,
        resturaunt: [Resturaunt],
        url: String
    }

    
    type EmailResponse{ 
        status:String
    }


    type Resturaunt { 
        id: ID, 
        name: String,
        stripe_id: String,
        url: String,
        opening_hour: Int, 
        closing_hour: Int,
        completed_registration: Boolean,
        base_id: Int,
        menu: [Menu]
    }
    type User { 
        id: ID, 
        firstName: String, 
        lastName: String, 
        buildingNumber: String, 
        roomNumber: String,
        streetAddress: String,
        email: String, 
        token: String, 
        roles: String, 
        specialDirections: String
        createdAt: String, 
        updatedAt: String
    }

    type Link{ 
        id: ID, 
        generatedlink: String, 
        createdAt: String, 
        updatedAt: String, 
        expired: String, 
        used: String
    }
    
    type Subscription{ 
        orderStatus: String
    }

    type Driver{ 
        id: ID, 
        email:String, 
        firstName: String, 
        lastName:String,
        url: String,
        token: String
    }
    

    type Query { 
        resturaunts:[Resturaunt]
        resturaunt(id: Int): [Resturaunt!]!
        getMenu(ids: [String]): [Menu!]!
        getAllMenus:[Menu]
        getLink(link: String): Link
        searchTags(tag: [String]):[Tag]
        searchMenuItems(menuItemID: Int): [MenuItems]
        getOwners(ownerId: Int): [Owner]
        getOrder(orderId: Int): Order
        getAllOrders: [Order]
    }

    type Mutation { 
        addUser(token: String, email: String): User
        sendMail(email: String): EmailResponse
        updateUser(token: String, email: String, streetAddress: String, firstName: String, lastName: String, buildingNumber: String, roomNumber: String, specialDirections: String): User
        addOwner(email: String, password: String): Owner
        addResturaunt(name: String, baseId: Int, openingHour: Int, closingHour: Int): Resturaunt
        loginOwner(email: String, password: String): Owner
        updateMenu(menuId: String, name: String, openingHour: Int, closingHour: Int): Menu
        updateMenuItems(menuItemId: Int, name: String, price: Int, description: String, available: Boolean, ): MenuItems
        addMenu(resturauntId: Int, name: String, openingHour: Int, closingHour: Int): Menu
        addMenuItem(resturauntId: Int, name: String, price:Int, description: String, menu_id: Int, available: Boolean  ): MenuItems
        addOrderItems(menuItemId: String, qty: Int, orderId: String ): OrderItems
        addOrder(userId: String, status: String, specialRequests: String, price: Int, menuItems: [InputMenuItems]): SessionURL
        addDrivers(email: String, password: String): Driver
        loginDrivers(email: String, password: String): Driver
        driverAcceptsOrder(orderId: String): Order
        requestPasswordReset(email: String): EmailResponse
        passwordReset(password: String): EmailResponse
        driverCompletesDelivery(orderId: String): Order
    }

 
    
`

const resolvers = { 
    Mutation: { 
        addUser: addUser,
        sendMail: sendMail,
        updateUser: updateUser,
        addOwner: addOwner,
        addResturaunt: addResturaunt,
        loginOwner: loginOwner,
        updateMenu: updateMenu,
        updateMenuItems: updateMenuItems,
        addMenu: addMenu,
        addMenuItem: addMenuItems, 
        addDrivers: addDrivers,
        addOrder: addOrder,
        loginDrivers: loginDrivers,
        driverAcceptsOrder: driverAcceptsOrder,
        requestPasswordReset: requestPasswordReset,
        passwordReset: passwordReset,
        driverCompletesDelivery: driverCompletesDelivery
    },
    Query: { 
        getOrder: getOrders,
        getAllOrders: getAllOrders,
        async resturaunt(root, { id },  { loader }){ 
            return await sequelize.models.Resturaunts.findAll({ 
                where: {id: id}
            })
        },
        async getMenu(root, { ids }, {hour}){ 
            
            // console.log(hour)
              const menus = await sequelize.models.Menus.findAll({ 
                where: { 
                    id: ids,
                    openingHour: {[Op.lte]: [hour]},
                    closingHour: {[Op.gte]: [hour]}
                }, include: {model: sequelize.models.MenuItems}
            
            })
            return menus

        },
        async getAllMenus(root, args, {hour}){ 
            console.log(hour)
            const allMenus = await sequelize.models.Menus.findAll({
                where: { 
                    openingHour: {[Op.lte]: [hour]},
                    closingHour: {[Op.gte]: [hour]}

                },
                include: sequelize.models.MenuItems
            })
            return allMenus
        },
        async resturaunts(_, args, context){ 
            return await sequelize.models.Resturaunts.findAll()
        },

        async getLink(_, args){ 
            return getLink(args)
        }, 
        async searchTags(_, {tag}, context){ 
            // search tag relationship for tag_id that matches query
            
            const ids = await sequelize.models.Tags.findAll({ 
                where: { 
                    tag: tag
                }, 
                
            })
            

           
            return ids

        },

        async getOwners(_, {ownerId}){ 
            // console.log(sequelize.models.Resturaunts)
            const owners = await sequelize.models.Owners.findAll({ 
                where: { 
                    id: ownerId
                },
            })
            // console.log(owners)
            // console.log(resturaunts)
            return owners
        }

            
        
    }, 
    Resturaunt: { 
        async menu(parent, args, {hour}){ 
            return await sequelize.models.Menus.findAll({ 
                where: {
                    ResturauntId: parent.dataValues.id,
                    openingHour: {[Op.lte]: [hour]},
                    closingHour: {[Op.gte]: [hour]}
                },
                include: { 
                    model: sequelize.models.MenuItems
                }
            })
        }
    }, 
    Menu: { 
        async resturaunt(parent, args, { resturaunts }){ 
            if(parent.dataValues){ 
                const menus = await sequelize.models.Menus.findAll({ 
                    where: { 
                        id: parent.dataValues.id
                    }, include: { 
                        model: sequelize.models.MenuItems
                    }
                })
                return await loader.resturaunts.load(parent.dataValues.ResturauntId)
            } 
            if(!parent.dataValues){ 
                return await loader.resturaunts.load(parent.ResturauntId)
            }
        }, 
        // async MenuItems(parent, args, context){ 
        //     // console.log(parent.dataValues.id)
            
        //     // return await MenuItems.findAll({ 
        //     //     where: {menu_id: parent.dataValues.id}
        //     // })
            
        // }
    }, 
    Tag: { 
        async menuItems(parent, args, {hour}){ 
            const tagjoins = await sequelize.models.TagJoins.findAll({ 
                where: {TagId: parent.dataValues.id}
            })

             const menuItemIds = tagjoins.map(item => { 
                return item.dataValues.MenuItemId
            })

            const menuItems = await sequelize.models.MenuItems.findAll({ 
                where: { 
                    id: {[Op.in]: menuItemIds}, 
                }
                
            })
            // console.log(parent)
            // const tags = await sequelize.models.Tags.findAll({
            //     where: { 
            //         id: parent.dataValues.TagId
            //     }
            // })
            
            return menuItems
        },
    },
    Owner: { 
        async resturaunt(parent, args, context){ 
            
            const resturaunts = await sequelize.models.Resturaunts.findAll({ 
                where: { 
                    id: parent.dataValues.id
                }, 
                include: [sequelize.models.Menus]
            })
            
            return resturaunts
        }
    }, 
    Subscription: { 
        orderStatus: { 
            subscribe: () =>  pubsub.asyncIterator(["ORDER_STATUS_CHANGE"])
        }
        
    }
}


async function startApolloServer(typeDefs, resolvers){ 
    const app = express()
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
                // console.log( event.data.object)
                console.log( charge, 'charge' )
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
    const httpServer = http.createServer(app)
    const schema = makeExecutableSchema({ 
        typeDefs, 
        resolvers
    })
    const subscriptionServer = SubscriptionServer.create(
        {schema, execute, subscribe}, 
        { server: httpServer, path: "/graphql"}
    )
    const server = new ApolloServer({ 
        schema, 
        plugins: [{ 
            async serverWillStart(){ 
                return { 
                    async drainServer(){ 
                        subscriptionServer.close()
                    }
                }
            }, 
            // async requestDidStart(requestContext){ 
            //     return { 
            //         // async didResolveSource(requestContext){ 
            //         //     console.log("didResolveSource")
            //         // }, 
            //         async willSendResponse(requestContext){ 
            //             console.log(requestContext)
            //         }
            //     }     
        }],
        
        context: ({req}) => { 
            const token = req.headers.authorization
            const hour = new Date().getHours()
            return {req: req.body, token: token, hour}
        }
        // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => { 
        httpServer.listen( { port: process.env.PORT }, resolve)})
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
}

;


startApolloServer(typeDefs, resolvers)

module.exports = {typeDefs, resolvers}

