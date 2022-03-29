
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: { 
        type: Sequelize.STRING, 
        unique: true,
        validate: { 
          isEmail(value){ 
            const regexPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            if(!regexPattern.test(value)){ 
              throw new Error("Please enter a valid email")
            } 
          }
        }
      },
      password: { 
        type: Sequelize.STRING, 
        validate: { 
          isString(value){ 
            const regex = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            if(!regex.test(value)){ 
              throw new Error("Password must be at least 7 characters and include one number, one uppercase, and one lowercase")
            }
          }
          // at least 7 characters, includes one Number, and one uppercase, and one lowercase 
        }
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      failed_Login_Attempts: Sequelize.INTEGER,
      account_locked_until: Sequelize.STRING,
      currently_delivering: Sequelize.BOOLEAN,
      stripe_id: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Drivers');
  }
};