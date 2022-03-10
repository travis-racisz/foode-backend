module.exports = (sequelize, DataTypes) => { 
  const Resturaunts = sequelize.define('Resturaunts' ,{ 
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false, 
      autoIncrement: true
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE, 
    baseId: DataTypes.INTEGER,
    opening_hour: DataTypes.STRING,
    stripe_id: DataTypes.STRING,
    completed_registration: DataTypes.BOOLEAN,
    closing_hour: DataTypes.STRING
  })


  return Resturaunts
}


