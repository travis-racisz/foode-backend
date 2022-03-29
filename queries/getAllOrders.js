const { sequelize } = require('../utils/sequelize')
const { models } = sequelize

const getAllOrders = async(_, args, context) => { 
    // return all orders that are awaiting drivers
    const orders = await models.Orders.findAll({
        where: { 
            status: "awaiting driver"
        }, 
        include: [models.OrderItems, models.Users]
    })
    console.log(orders)
    return orders
}
module.exports = getAllOrders