// const { DataTypes } = require('sequelize')
// const sequilize = require('../utils/sequelize')


// const Menu = require('./menus')
module.exports = (sequelize, DataTypes) => { 
    const MenuItems = sequelize.define('MenuItems', { 
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        name: { 
            type: DataTypes.STRING, 
        }, 
        createdAt: { 
            type: DataTypes.DATE, 
            defaultValue: Date.now()
        }, 
        price: { 
            type: DataTypes.INTEGER
        }, 
        priceId: { 
            type: DataTypes.STRING
        },
        description: { 
            type: DataTypes.STRING
        }, 
        menu_id: { 
            type: DataTypes.INTEGER,
        }, 
        available: { 
            type: DataTypes.BOOLEAN
        }, 
        size: DataTypes.STRING,
        priceId: DataTypes.STRING
    })
    MenuItems.associate = (models) =>{ 
        MenuItems.belongsTo(models.Menus , { 
            foreignKey: "id"
        })
    }
    return MenuItems
}

// MenuItems.belongsTo(Menu)

// module.exports = MenuItems