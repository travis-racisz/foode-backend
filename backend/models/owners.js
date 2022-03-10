module.exports = (sequelize, DataTypes) => {
  const Owners = sequelize.define("Owners", { 
    email: { 
      type: DataTypes.STRING, 
      unqiue: true,
      allowNull: false, 
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
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,99}$/
        // at least 7 characters, includes one Number, and one uppercase, and one lowercase 
      }
    },
    role: DataTypes.STRING,
    failed_login_attempts: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0,
    },
    account_locked_until: DataTypes.STRING, 
    stripe_id: DataTypes.STRING,
  })
  Owners.associate = ( models ) => { 
    Owners.belongsToMany(models.Resturaunts, { 
      through: models.OwnersJoin
    })

  }
  return Owners;
};