
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
require('dotenv').config()
const envMode = process.env.NODE_ENV || "development"
console.log(envMode)

const { Sequelize } = require('sequelize')
const optionsgroups = require('../models/optionsgroups')

// replace these values with env values


  if(envMode === "development"){
    var sequelize = new Sequelize({
        username: process.env.DEV_DBUSER,
        password: process.env.DEV_DBPASS,
        database: process.env.DEV_DBNAME,
        host: 'localhost',
        dialect: 'postgres',
        timezone: '+00:00',
        logging:false,
        port: 5432,
        // ssl:true, 
        // dialectOptions: { 
        //     ssl: { 
        //         require: true, 
        //         rejectUnauthorized: false
        //     }, 
        // }
    })
} else { 
    var sequelize = new Sequelize(process.env.DATABASE_URL,{
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+00:00',
    logging:false,
    port: 5432,
    ssl:true, 
    dialectOptions: { 
        ssl: { 
            require: true, 
            rejectUnauthorized: false
        }, 
    }
  })
}
// const sequelize = require("../index")

const modelDefiner = [ 
    require('../models/resturaunts'),
    require('../models/menus'),
    require('../models/menuitems'),
    require('../models/user'),
    require('../models/links'),
    require('../models/bases'),
    require('../models/orders'),
    require('../models/orderitems'),
    require('../models/tags'),
    require("../models/tagjoin"),
    require("../models/owners"),
    require("../models/ownersjoin"),
    require("../models/orders"),
    require('../models/orderitems'),
    require('../models/drivers'),
    require("../models/options"),
    require("../models/optionsgroups")
]

for (const associationDefiners of modelDefiner){ 
    associationDefiners(sequelize, Sequelize)
}

function applyAssociations(sequelize){ 

    const { Menus, Resturaunts, TagJoins, Tags, MenuItems, Orders, OrderItems, Users, Options, OptionsGroups } = sequelize.models
    Resturaunts.hasMany(Menus)
    Menus.belongsTo(Resturaunts)
    Menus.hasMany(MenuItems, {foreignKey: "menu_id"})
    MenuItems.belongsToMany(Tags, {through: TagJoins})
    MenuItems.belongsTo(Menus, {foreignKey: "id"})
    Tags.belongsToMany(MenuItems, {through: TagJoins})
    Orders.hasMany(OrderItems, {foreignKey: "order_id"})
    Users.hasMany(Orders, {foreignKey: "user_id"})
    Orders.belongsTo(Users, {foreignKey: "id"})
    OrderItems.belongsTo(Orders, {foreignKey: "id"})
    MenuItems.hasMany(OptionsGroups, {foreignKey: "menuItem_id"})
    OptionsGroups.belongsTo(MenuItems, {foreignKey: "id"})
    OptionsGroups.hasMany(Options, {foreignKey: "optionsGroup_id"})
    Options.belongsTo(OptionsGroups, {foreignKey: "id"})
    
}

applyAssociations(sequelize)
async function reset(){ 
    try { 
        await sequelize.authenticate()
        await sequelize.sync()
        //  console.log('Connection has been established successfully.');
    } catch(error){ 
        console.log('Unable to connect to the database:', error)
    }
}
reset()

module.exports = {
    sequelize,
    pubsub
}