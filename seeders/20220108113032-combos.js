module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert("Combos", [
      { 
        name: "3 Cruncy Tacos Supreme",
        price: 7500, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "3 Cruncy Tacos Supreme",
        price: 7700, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "3 Cruncy Tacos Supreme",
        price: 8000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "3 Soft Tacos Supreme",
        price: 7500, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "3 Soft Tacos Supreme",
        price: 7700, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "3 Soft Tacos Supreme",
        price: 8000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "Burrito Supreme",
        price: 8000, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "Burrito Supreme",
        price: 8200, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "Burrito Supreme",
        price: 9000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "Cruchwrap Supreme",
        price: 9000, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), }
      , 
      { 
        name: "Cruchwrap Supreme",
        price: 9500, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Cruchwrap Supreme",
        price: 10000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Nachos Bell Grande",
        price: 8000, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Nachos Bell Grande",
        price: 9000, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Nachos Bell Grande",
        price: 10000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "2 Chicken Chalupas",
        price: 8000, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "2 Chicken Chalupas",
        price: 9000, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "2 Chicken Chalupas",
        price: 10000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Chicken Quesadilla",
        price: 8000, 
        size: "Small", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Chicken Quesadilla",
        price: 9000, 
        size: "Medium", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Chicken Quesadilla",
        price: 10000, 
        size: "Large", 
        available: true,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Mexican Pizza",
        price: 8000, 
        size: "Small", 
        available: false,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Mexican Pizza",
        price: 9000, 
        size: "Medium", 
        available: false,
        menu_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      },
      { 
        name: "Mexican Pizza",
        price: 10000, 
        size: "Large", 
        available: false,
        menu_id: 2,
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
