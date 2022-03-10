
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Menus', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { 
        type: Sequelize.STRING
      }, 
      createdAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW
      }, 
      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: false
      }, 
      ResturauntId: { 
        type: Sequelize.INTEGER,
        references: { 
          model: 'Resturaunts', 
          key: 'id'
        }
      }, 
      openingHour: { 
        type: Sequelize.INTEGER
      }, 
      closingHour: { 
        type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Menus');
  }
};
