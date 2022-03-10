
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { 
     type: DataTypes.INTEGER, 
     primaryKey: true, 
     allowNull: false,
     autoIncrement: true
    },
    email: { 
     type: DataTypes.STRING,
     unqiue: true ,
     validate: { 
      isEmail(value){ 
        const regexPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if(!regexPattern.test(value)){ 
          throw new Error("Please enter a valid email")
        } 
      }
    }
    }, 
    resetToken: { 
      type: DataTypes.STRING
    }, 
    streetAddress: DataTypes.STRING,
    buildingNumber: DataTypes.STRING, 
    roomNumber: DataTypes.STRING, 
    base: { 
      type: DataTypes.STRING, 
    },
    baseId: { 
      type: DataTypes.INTEGER, 
    },
    firstName: DataTypes.STRING, 
    lastName: DataTypes.STRING,
    specialDirections: DataTypes.STRING, 
  }, 
 )

  Users.associate = (models) => { 
    Users.belongsTo(models.Bases, { 
      foreignKey: "id"
    })
  }

  return Users;
};