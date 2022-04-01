module.exports = (sequelize, DataTypes) => {
  const OptionsGroup = sequelize.define('OptionsGroups', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    numberOfChoices: DataTypes.INTEGER, 
    menuItem_id: { 
      type: DataTypes.INTEGER,
      references: { 
          model: "MenuItems",
          key: "id"
      }
  }, 
  })
  OptionsGroup.associate = (models) => {
    OptionsGroup.hasMany(models.Options, {  
      foreignKey: "optionsGroup_id"})
  }
  return OptionsGroup;
};