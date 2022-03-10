module.exports =  (sequelize, DataTypes) => { 
    const Menus = sequelize.define('Menus', { 
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        name: { 
            type: DataTypes.STRING, 
            allowNull:false,
        }, 
        createdAt:{ 
            type: DataTypes.DATE, 
            defaultValue: Date.now() 
        } , 
        ResturauntId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: { 
                model: "Resturaunts",
                key: "id"
            }
        },
        openingHour: { 
            type: DataTypes.INTEGER
        },
        closingHour: { 
            type: DataTypes.INTEGER
        }  
    })

    // Menus.associate = ( models ) => { 
    //     Menus.belongsTo(models.Resturaunts, { 
    //         foreignKey: "id"
    //     })
    // }

        // Menus.belongsTo(Resturaunts, { 
        //     foreignKey: 'id'
        // })
        // Menus.hasMany(models.Combos, { 
        //     foreignKey: "menu_id"
        // })
  

    return Menus
}

// Menu.belongsTo(resturaunts)
// Menu.hasMany(MenuItems, { 
//     foreignKey: "menu_id"
// })

// module.exports = Menu