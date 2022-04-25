
const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getOrders = async(_, args, context) => { 
    // check the token for validity
    jwt.verify(context.token, process.env.SECRET, function(err, decoded){ 
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
        
        return order
        


}

module.exports = getOrders