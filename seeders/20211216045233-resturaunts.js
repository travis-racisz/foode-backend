


module.exports = {
  up: async (queryInterface, Sequelize) => {
     return await queryInterface.bulkInsert('Resturaunts',  [{
        
        name: "pizza hut", 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        baseId: "1",
        opening_hour: 9, 
        closing_hour: 21
      }, { 
        
        name: "taco bell",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        baseId: "1",
        opening_hour: 9, 
        closing_hour: 21
      }, 
      { 
      
        name: "popeyes",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        baseId: "1",
        opening_hour: 9, 
        closing_hour: 21
      }
    ], {})
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

      return await queryInterface.bulkDelete('Resturaunts', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
