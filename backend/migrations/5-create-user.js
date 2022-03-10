module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
       },
       email: { 
        type: Sequelize.STRING, 
       }, 
       resetToken: { 
         type: Sequelize.STRING
       }, 
       streetAddress: Sequelize.STRING,
       buildingNumber: Sequelize.STRING, 
       roomNumber: Sequelize.STRING, 
       base: { 
         type: Sequelize.STRING, 
       },
       baseId: { 
         type: Sequelize.INTEGER, 
       },
       firstName: Sequelize.STRING, 
       lastName: Sequelize.STRING,
       specialDirections: Sequelize.STRING,
      roles: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};