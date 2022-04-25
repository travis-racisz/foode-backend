const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const db = require("../../utils/firebaseConfig")
const jwt = require('jsonwebtoken')
const { pubsub } = require('../../utils/sequelize')
const driverCompletesDelivery = async (_, args, context) => { 
    // get the order related to the driver
    // update the status as delivered
    // allow the driver to accept a new order

    const user = jwt.verify(context.token, process.env.SECRET, (err, decoded) => { 
        if(err){ 
            throw new Error(err)
        }
        if(decoded){ 
            return decoded
        }
    })

    
    const order = models.Orders.findOne({ 
        where: { 
            id: args.orderId
        }
    })

    const orderRef = db.collection('orders').doc(args.orderId)
    const updateOrder = await orderRef.update({status: "complete"})
    
    const updatedOrder = await order.update({ 
        status: "Completed"
    })

    const driver = await models.Drivers.findOne({ 
        where: { 
            id: user.id
        }
    })
    const updatedDriver = await driver.update({ 
        currentlyDelivering: false
    })

    pubsub.publish("ORDER_STATUS_CHANGE", { 
        orderStatus: "Completed"
    })

    return updatedOrder.dataValues





}

module.exports = driverCompletesDelivery