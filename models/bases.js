
module.exports = (sequelize, DataTypes) => {
  const Bases = sequelize.define("Bases", { 
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true
    }, 
    base: { 
      type: DataTypes.STRING
    }
  })

  Bases.associate = (models) => { 
    Bases.hasMany(models.Resturaunts, { 
      foreignKey: "base_id"
    })
  }
  return Bases;
};