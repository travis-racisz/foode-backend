const db = require("../../utils/firebaseConfig")

const getDriversCompletedOrders = async (_, args, context) => { 
    /* takes the ID of the driver to find all of the 
    orders that are completed and also have that drivers 
    ID in the drivers details 
    */
   const orderArray = []

    const orderRef = db.collection('orders')
    const data = await orderRef.where('driverDetails.id', '==', args.id).where('status', '==', 'completed').limit(10).get()

    if(!data.empty){ 
        data.forEach(order => { 
            orderArray.push(order.data())
        })
    }

    console.log(orderArray)

    return orderArray



}


module.exports = getDriversCompletedOrders