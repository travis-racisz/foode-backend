const {ApolloServer} = require('apollo-server-express')
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { app, httpServer } = require('./utils/expressServer')


const jwt = require('jsonwebtoken')
const { pubsub } = require('./utils/sequelize')
const options = require('./models/options')
const { typeDefs } = require('./schema/typedefs')
const { resolvers } = require('./resolvers/resolver.js')

async function startApolloServer(typeDefs, resolvers){ 
    
    
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
            introspection: true, 
        }],
        
        context: ({req}) => { 
            const token = req.headers.authorization
            const hour = new Date().getHours()
            // const hour = 10
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

