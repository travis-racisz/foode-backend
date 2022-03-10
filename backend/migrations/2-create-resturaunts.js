module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Resturaunts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      stripe_id: Sequelize.STRING,
      completed_registration: Sequelize.BOOLEAN,
      baseId: { 
        type: Sequelize.INTEGER
      }, 
      opening_hour: { 
        type: Sequelize.INTEGER
      }, 
      closing_hour: { 
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Resturaunts');
  }
};