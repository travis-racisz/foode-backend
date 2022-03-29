const { sequelize, } = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
const { pubsub } = require('../utils/sequelize')
const driverAcceptsOrder = async (_, args, context) => { 
    // should check to see if the driver is logged in and is a driver to see this data
    const user = jwt.verify(context.token, process.env.SECRET, function(err, decode){ 
        if(err){ 
            throw new Error(err)
        } 
        if(decode){ 
            return decode
        }
    })
    // the order that is accepted will be sent as an arg and the status will be updated to accepted

    if(user){ 
        // update status of driver, to say they are delivering an order
        const driver = await models.Drivers.findOne({ 
            where: { 
                id: user.id
            }
        })
        driver.update({ 
            currentlyDelivering: true
        })
        // change the status of that order to be delivery in progress
        const order = await models.Orders.findOne({ 
            where: {id: args.orderId}
        })
        const updatedOrder = await order.update({ 
            status: "out for delivery"
        })
        pubsub.publish("ORDER_STATUS_CHANGE",{ orderStatus: "out for delivery"})
        console.log(updatedOrder.dataValues)
        return updatedOrder.dataValues
    }
}

module.exports = driverAcceptsOrder