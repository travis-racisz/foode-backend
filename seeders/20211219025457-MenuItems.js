'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('MenuItems', [
      { 
        name: "breakfast taco", 
        price: 1000, 
        createdAt: new Date().toISOString(), 
        description: "Eggs and beans wrapped in a tortilla", 
        menu_id: 4,
        
        
      }, 
      { 
        name: "breakfast burrito", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "Eggs and beans wrapped in a tortilla shaped into a burrito", 
        menu_id: 4,
        
        
      }, 
      { 
        name: "potato burrito", 
        price: 800, 
        createdAt: new Date().toISOString(), 
        description: "Potatoes with a creamy spicy sauce", 
        menu_id: 5,
        
      },
      { 
        name: "potato burrito", 
        price: 800, 
        createdAt: new Date().toISOString(), 
        description: "Potatoes with a creamy spicy sauce", 
        menu_id: 6, 
        
      },
      { 
        name: "Cheese Quesadilla", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "a toasted tortilla with cheese", 
        menu_id: 5,
        
      },
      { 
        name: "Cheese Quesadilla", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "a toasted tortilla with cheese", 
        menu_id: 6,
        
      },
      { 
        name: "chicken Quesadilla", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "a toasted tortilla with cheese and chicken", 
        menu_id: 5,
        
      },
      { 
        name: "chicken Quesadilla", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "a toasted tortilla with cheese and chicken", 
        menu_id: 6,
        
      },
      { 
        name: "Egg Pizza?", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "please dont order this its literally scrambled eggs on pizza", 
        menu_id: 1,
        
        
      },
      { 
        name: "Breakfast Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 1,
        
        
      },
      { 
        name: "Meat Lovers Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 2,
        
      },
      { 
        name: "Veggie Lovers Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 2,
        
      },
      { 
        name: "Italian Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 2,
        
      },
      { 
        name: "Regular Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 2,
        
      },
      { 
        name: "Meat Lovers Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 3,
        
      },
      { 
        name: "Veggie Lovers Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 3,
        
      },
      { 
        name: "Italian Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 3,
        
      },
      { 
        name: "Regular Pizza", 
        price: 1600, 
        createdAt: new Date().toISOString(), 
        description: "Eggs sausage, with a white gravy sauce", 
        menu_id: 3,
        
      },
      { 
        name: "Breakfast Chicken Biscuit", 
        price: 600, 
        createdAt: new Date().toISOString(), 
        description: "Chicken and eggs on a biscuit", 
        menu_id: 7,
        
        
      },
      { 
        name: "Breakfast Chicken Bagel", 
        price: 600, 
        createdAt: new Date().toISOString(), 
        description: "Chicken and eggs on a Bagel", 
        menu_id: 7,
        
        
      },
      { 
        name: "Coffee", 
        price: 200, 
        createdAt: new Date().toISOString(), 
        description: "black coffee", 
        menu_id: 7,
        
        
      },
      { 
        name: "Chicken Tenders", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "a basket of chicken tenders and a side of fries", 
        menu_id: 8,
        
      },
      { 
        name: "Chicken Tenders spicy", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "a basket of spicy chicken tenders and a side of fries", 
        menu_id: 8,
        
      },
      { 
        name: "Chicken Wings", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "a basket of chicken wings and a side of fries", 
        menu_id: 8,
        
      },
      { 
        name: "Chicken Tenders", 
        price: 1200, 
        createdAt: new Date().toISOString(), 
        description: "a basket of chicken tenders and a side of fries", 
        menu_id: 9,
        
      },
      { 
        name: "Chicken Tenders spicy", 
        price: 1450, 
        createdAt: new Date().toISOString(), 
        description: "a basket of spicy chicken tenders and a side of fries", 
        menu_id: 9,
        
      },
      { 
        name: "Chicken Wings", 
        price: 1700, 
        createdAt: new Date().toISOString(), 
        description: "a basket of chicken wings and a side of fries", 
        menu_id: 9,
        
      },
      { 
        name: "Family Bucket Meal", 
        price: 2700, 
        createdAt: new Date().toISOString(), 
        description: "a large bucket of chicken for the entire family", 
        menu_id: 9,
        
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('MenuItems', null, {});
  }
};
