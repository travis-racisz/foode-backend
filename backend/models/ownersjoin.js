module.exports = (sequelize, DataTypes) => {
  const OwnersJoin = sequelize.define("OwnersJoins", { 
    resturauntId: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    ownerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  })
  return OwnersJoin;
};