module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Menus' ,[
      { 
        name: "pizza hut breakfast", 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
        ResturauntId: 1,
        openingHour: 7,
        closingHour: 10
      }, 
    {  
      name: 'pizza hut lunch', 
      createdAt:new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 1,
      openingHour: 10,
      closingHour: 21
    }, 
    { 
      
      name: "pizza hut dinner", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 1,
      openingHour: 10,
      closingHour: 21
    },  
    { 
      
      name: "pizza hut extras", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 1,
      openingHour: 7,
      closingHour: 21
    },  
    { 
      
      name: "pizza hut dessert", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 1,
      openingHour: 10,
      closingHour: 21
    },  
    
    { 
      
      name: "taco bell breakfast", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 2,
      openingHour: 7,
      closingHour: 10
    }, 
    { 
      
      name: 'taco bell lunch', 
      createdAt:new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 2,
      openingHour: 10,
      closingHour: 21
    }, 
    { 
      
      name: 'taco bell dinner', 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 2,
      openingHour: 10,
      closingHour: 21
    }, 
    { 
      
      name: "taco bell extras", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 2,
      openingHour: 7,
      closingHour: 21
    }, 
    { 
      
      name: "taco bell dessert", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 2,
      openingHour: 10,
      closingHour: 21
    }, 
    { 
      
      name: "Popeyes breakfast", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      ResturauntId: 3,
      openingHour: 7,
      closingHour: 10
    }, 
    { 
      
      name: 'Popeyes lunch', 
      createdAt: new Date().toISOString(), 
      updatedAt:new Date().toISOString(), 
      ResturauntId: 3,
      openingHour: 10,
      closingHour: 21
    }, 
    {
       
      name: 'Popeyes dinner', 
      createdAt: new Date().toISOString(), 
      updatedAt:new Date().toISOString(), 
      ResturauntId: 3,
      openingHour: 10,
      closingHour: 21
    },
    {
       
      name: 'Popeyes extras', 
      createdAt: new Date().toISOString(), 
      updatedAt:new Date().toISOString(), 
      ResturauntId: 3,
      openingHour: 10,
      closingHour: 21
    },
    {
       
      name: 'Popeyes dessert', 
      createdAt: new Date().toISOString(), 
      updatedAt:new Date().toISOString(), 
      ResturauntId: 3,
      openingHour: 10,
      closingHour: 21
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Menus', null, {});
  }
};
