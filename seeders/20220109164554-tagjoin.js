'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("TagJoins", [
        { 
          TagId: 2,
          MenuItemId: 1,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
        
        },
        { 
          TagId: 2,
          MenuItemId: 2,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
        
        },
        { 
          TagId: 2,
          MenuItemId: 3,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
        
        },
        { 
          TagId: 1,
          MenuItemId: 9,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
        
        },
        { 
          TagId: 1,
          MenuItemId: 10,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
        
        },
      ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("TagJoins", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
