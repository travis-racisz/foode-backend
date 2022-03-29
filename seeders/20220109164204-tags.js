'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tags", [
      { 
        tag: "pizza",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      
      }, 
      { 
        tag: "taco",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      
      },
      { 
        tag: "dessert",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      
      },
      { 
        tag: "drink",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      
      },
      { 
        tag: "sub",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      
      },
      { 
        tag: "sandwich",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      
      },
      { 
        tag: "wings",
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
    queryInterface.bulkDelete('Tags', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
