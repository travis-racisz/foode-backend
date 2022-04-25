const addUser = require('./mutations/addFacebookUser')
const {sendMail} = require("../mailer/mailerConfig")
const updateUser  = require('./mutations/updateUser')
const addOwner = require('./mutations/addOwner')
const addResturaunt = require('./mutations/addResturaunt')
const loginOwner = require('./mutations/loginOwner')
const updateMenu = require('./mutations/updateMenu')
const updateMenuItems = require('./mutations/updateMenuItems')
const addMenu = require('./mutations/addMenu')
const addMenuItems = require('./mutations/addmenuItems')
const addDrivers = require('./mutations/addDrivers')
const addOrder = require('./mutations/addOrder')
const loginDrivers = require('./mutations/loginDrivers')
const driverAcceptsOrder = require('./mutations/driverAcceptOrder')
const passwordReset = require('./mutations/passwordReset')
const driverCompletesDelivery = require('./mutations/driverCompletesDelivery')
const requestPasswordReset = require('./mutations/requestPasswordReset')
const getOrders = require('./queries/getOrders')
const getAllOrders = require('./queries/getAllOrders')
const {sequelize} = require('../utils/sequelize')
const { Op } = require('sequelize')

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
                }, 
                include: [{
                    model: sequelize.models.MenuItems,
                    include: [{ 
                        model: sequelize.models.OptionsGroups,
                        include: [{
                            model: sequelize.models.Options
                        }]
                    }]
                }]
            
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
                include: [{
                    model: sequelize.models.MenuItems,
                    include: [{ 
                        model: sequelize.models.OptionsGroups,
                        include: [{
                            model: sequelize.models.Options
                        }]
                    }]
                }]
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
            const owners = await sequelize.models.Owners.findAll({ 
                where: { 
                    id: ownerId
                },
            })
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
                include: [{
                    model: sequelize.models.MenuItems,
                    include: [{ 
                        model: sequelize.models.OptionsGroups,
                        include: [{
                            model: sequelize.models.Options
                        }]
                    }]
                }]
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
    MenuItems: { 
        async optionsgroup(parent, args, context){ 
            return await sequelize.models.OptionsGroups.findAll({ 
                where: { 
                    menuItem_id: parent.dataValues.id
                }
            })
        }
    },
    OptionsGroup: { 
        async options(parent, args, context){
            return await sequelize.models.Options.findAll({ 
                where: { 
                    optionsGroup_id: parent.dataValues.id
                }
            })
        }
    },
    Subscription: { 
        orderStatus: { 
            subscribe: () =>  pubsub.asyncIterator(["ORDER_STATUS_CHANGE"])
        }
        
    }
}

module.exports = {resolvers}