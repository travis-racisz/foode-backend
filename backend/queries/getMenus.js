// const knex = require('../utils/knex')
// const DataLoader = require('dataloader')

// // DEPRECITATED GET RID OF THIS

// const getMenus = async(_, {id, menuName}) => {
//     const menuLoaders = { 
//         menus: new DataLoader((key) => { 
//             knex.table('resturaunt')
//                 .where({id: key})
//                 .where({menu_name: menuName})
//                 .innerJoin('menuItems', 'menus.menu_id', 'menuItems.menu_id')
//         })
//     }

//     const menu = await Promise.all([menuLoaders.menu.load(id)])

//     console.log(menu)

//     return menu
// }

// module.getMenus = getMenus
