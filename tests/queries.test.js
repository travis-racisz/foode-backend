const { ApolloServer } = require('apollo-server-express')
const {typeDefs, resolvers} = require('../server')
// write a test to get all resturaunts 

const hour = new Date().getHours()
const testServer = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: { 
        hour: hour
    }
})

test("returns all of the restuarants", async () => { 

    const result = await testServer.executeOperation({ 
        query: "query Resturaunts { resturaunts { name opening_hour closing_hour }}"
    })

    expect(result.errors).toBeUndefined()
})

test("returns no menus when the time of day is before 7 am", async () => { 
    const result = await testServer.executeOperation({ 
        query: `query GetAllMenus {
            getAllMenus {
              name
              resturaunt {
                opening_hour
                closing_hour
              }
            }
          }`
    })
    if(hour < 7){ 
        expect(result.data).toBeNull()
    }

    if(hour >= 7){ 
        expect(result.data).toBeDefined()
    }
})

test("Tags return Pizza when tag 'Pizza' is passed as an arugment", async () => { 
    const result = await testServer.executeOperation({ 
        query: ` 
        query SearchTags($tag: [String]) {
            searchTags(tag: $tag) {
              tag
              id
            }
          }
        `, 
        variables: {tag: "pizza"}
    })

    expect(result.data.searchTags[0].tag).toBe("pizza")
})


test('returns pending orders from the database', async () => { 
    const result = await testServer.executeOperation({ 
        query: ` 
            query GetAllOrders {
                getAllOrders {
                status
                }
            }
        `
    })
    expect(result.data.getAllOrders[0].status).toBe('pending')
})

