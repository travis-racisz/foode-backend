
module.exports = { 
    up: async (queryInterface, Sequelize) => { 
        await queryInterface.createTable('MenuItems', { 
            id: { 
                allowNull: false, 
                autoIncrement: true, 
                type: Sequelize.INTEGER, 
                primaryKey: true
            }, 
            name: { 
                type: Sequelize.STRING, 
            }, 
            createdAt: { 
                type: Sequelize.DATE
            }, 
            updatedAt: { 
                type: Sequelize.DATE,
                allowNull: true,
            },
            price:{ 
                type: Sequelize.INTEGER
            }, 
            priceId: Sequelize.STRING,
            description: { 
                type: Sequelize.STRING
            }, 
            menu_id: { 
                type: Sequelize.INTEGER,
                references: { 
                    model: "Menus", 
                    key: "id"
                }
            },
            available: { 
                type: Sequelize.BOOLEAN
            },
            size: Sequelize.STRING,
            priceId: Sequelize.STRING
            
        })
    }, 
    down: async(queryInterface, Sequelize) => { 
        await queryInterface.dropTable("MenuItems")
    }
}