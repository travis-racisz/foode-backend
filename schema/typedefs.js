const { gql } = require('apollo-server-express');
const typeDefs = gql`   
    type Menu { 
        id: ID, 
        name: String, 
        ResturauntId: ID, 
        MenuItems: [MenuItems],
        resturaunt: Resturaunt,
    }
    
    type SessionURL { 
        orderId: String,
        client_secret: String
        id:String
    }

    type Options { 
        id: ID,
        name: String,
        value: Int,
        priceId: String,
        optionsGroupId: ID,
    }

    input OptionsInput {
        id: ID,
        name: String,
        value: Int,
        menuItemId: ID,
        priceId: String
    }

    
    type Order{ 
        id:ID, 
        user_id: String, 
        OrderItems: [OrderItems],
        User: User
        status: String,
        price: Int
    }


    input OrderInput { 
        id: Int,
        name: String,
        price: Int, 
        description: String,
        options: [OptionsInput],
        optionsgroup: [OptionsGroupInput],
        priceId: String,
        hasPayed: Boolean,
        userId: String,
    }

    type OrderItems{ 
        id: ID, 
        name: String, 
        price: Int,
        order_id: Int,
        description: String,
        optionsGroup: [OptionsGroup],
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
        optionsgroup: [OptionsGroup]
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

    type OptionsGroup{ 
        id: ID,
        name: String, 
        description: String,
        numberOfChoices: Int,
        options: [Options]
    }

    input OptionsGroupInput{
        name: String,
        description: String,
        numberOfChoices: Int,
        options: [OptionsInput]
    }

    type ClientSecret{ 
        client_secret: String
        id: String
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
        addMenuItem(resturauntId: Int, name: String, price:Int, description: String, menu_id: Int, available: Boolean, options: [OptionsInput], optionsGroup: [OptionsGroupInput]  ): MenuItems
        addOrderItems(menuItemId: String, qty: Int, orderId: String ): OrderItems
        addOrder(RestaurantId:Int, total: Float, order: [OrderInput]): SessionURL
        addDrivers(email: String, password: String): Driver
        loginDrivers(email: String, password: String): Driver
        driverAcceptsOrder(orderId: String): Order
        requestPasswordReset(email: String): EmailResponse
        passwordReset(password: String): EmailResponse
        driverCompletesDelivery(orderId: String): Order
        createPaymentIntent(total: Float, orderId: String): ClientSecret
    }

 
    
`

module.exports = {typeDefs};