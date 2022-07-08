const { sequelize } = require('../../utils/sequelize')
const { models } = sequelize
const db = require('../../utils/firebaseConfig')



const getAllOrders = async(_, args, context) => { 
    // return all orders that are currently pending in google firestore
    const collection = await db.collection('orders')
    const availableOrders = await collection.where('status', '==', 'pending').get()
    const orders = []
    availableOrders.forEach(doc => { 
        orders.push(doc.data())
    })
    return orders

    // console.log(availableOrders)
}
module.exports = getAllOrders