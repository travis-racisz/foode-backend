
const { sequelize } = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()
const getOrders = async(_, args, context) => { 
    const user = jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
        if(err){ 
            throw new Error(err)
        }
        if(decoded){ 
            return decoded
        }
    })

        const {dataValues: order} = await models.Orders.findOne({
            where:{ 
                id: args.orderId
            }, 
            include: [models.OrderItems, models.Users ]
        })
        if(user.id === order.user_id){ 
            return order
        }

    return new Error("permission denied")

}

module.exports = getOrders