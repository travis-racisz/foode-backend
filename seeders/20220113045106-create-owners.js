const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // console.log(password)
    await queryInterface.bulkInsert( "Owners", [ 
      { 
        email: "John@email.com",
        password: bcrypt.hashSync("password1234", 10),
        role: "Admin", 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      }, 
      { 
        email: "Jack@email.com",
        password: bcrypt.hashSync("password12345", 10),
        role: "Admin", 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      }, 
      { 
        email: "Jane@email.com",
        password: bcrypt.hashSync("password123456", 10),
        role: "Viewer", 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      }
    
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

    queryInterface.bulkDelete("Owners", {}, null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
