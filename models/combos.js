const { Sequelize, DataTypes} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
const Combos = sequelize.define('Combos', { 
  name: DataTypes.STRING,
  price: DataTypes.INTEGER,
  size: DataTypes.STRING,
  available: DataTypes.BOOLEAN,
  menu_id: DataTypes.STRING
})

Combos.associate = (models) => { 
  Combos.belongsTo(models.Menus, { 
    foreignKey: "id"
  })
  Combos.hasMany(models.MenuItems, { 
    foreignKey: "combo_id"
  })
}
  
  return Combos;
};