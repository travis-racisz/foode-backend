

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Bases', [{ 
      base: "Yokota Air Force Base",
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
    }])
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

    await queryInterface.bulkDelete('Bases', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
