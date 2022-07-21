
module.exports = (sequelize, DataTypes) => {
  const Drivers = sequelize.define("Drivers", { 
    email: { 
      type: DataTypes.STRING, 
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
      type: DataTypes.STRING, 
      validate: { 
        isString(value){ 
          const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,99}$/
          if(!regex.test(value)){ 
            throw new Error("Password must be at least 7 characters and include one number, one uppercase, and one lowercase")
          }
        }
        // at least 7 characters, includes one Number, and one uppercase, and one lowercase 
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    failed_Login_Attempts: DataTypes.INTEGER,
    currently_delivering: DataTypes.BOOLEAN,
    account_locked_until: DataTypes.STRING,
    stripe_id: DataTypes.STRING, 
    verified: DataTypes.BOOLEAN
  })
  return Drivers;
};