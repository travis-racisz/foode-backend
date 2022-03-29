const sequelize = require('../utils/sequelize')




const getResturaunt = async (_, {id}, {models}) => { 
    const resturaunt = sequelize.model('resturaunts')

    const allResturaunts = await resturaunt.findAll({ 
        where: {id: id}
        
    })

    
   
    return allResturaunts
}

const getMenus = async(_, {id}) => { 
    const model = sequelize.model('menus')
    const now = Date.now()
    const hour = now.getHours()
    console.log(hour)
    const menus = await model.findAll({ 
        where: { 
            resturaunt_id: id
        }
    })

    // add in time filtering for menus to it only returns the appropriate menu
    console.log(JSON.stringify(menus))
    return menus
}

module.exports = {getResturaunt, getMenus}