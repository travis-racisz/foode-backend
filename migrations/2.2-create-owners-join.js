
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OwnersJoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resturauntId: {
        type: Sequelize.INTEGER, 
        references: { 
          model: "Resturaunts", 
          key: "id"
        }
      },
      ownerId: {
        type: Sequelize.INTEGER, 
        references: { 
          model: "Owners", 
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OwnersJoins');
  }
};