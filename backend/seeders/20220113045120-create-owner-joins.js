'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("OwnersJoins", [
      { 
        resturauntId: "1", 
        ownerId: "1",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      }, 
      { 
        resturauntId: "2", 
        ownerId: "1",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      }, 
      { 
        resturauntId: "1", 
        ownerId: "2",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      },
      { 
        resturauntId: "3", 
        ownerId: "3",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      },  
      { 
        resturauntId: "3", 
        ownerId: "1",
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
      queryInterface.bulkDelete("OwnersJoins", {}, null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
