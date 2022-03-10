module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define("Tags",{ 
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey:true,
      autoIncrement: true
    },
    tag: DataTypes.STRING,
  })
  return Tags;
};