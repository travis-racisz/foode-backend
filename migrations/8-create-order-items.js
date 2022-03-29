module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING, 
      qty: {
        type: Sequelize.INTEGER
      },
      price: Sequelize.INTEGER,
      size: Sequelize.STRING,
      order_id: {
        type: Sequelize.INTEGER, 
        references: { 
          model: "Orders", 
          key: "id"
        }
      },
      combo: { 
        type: Sequelize.BOOLEAN, 
        defaultValue:false
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
    await queryInterface.dropTable('OrderItems');
  }
};