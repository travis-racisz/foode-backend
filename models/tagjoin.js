module.exports = (sequelize, DataTypes) => {
  const TagJoins = sequelize.define("TagJoins", { 
    TagId: {
      type: DataTypes.INTEGER, 
      references: { 
        model: "Tags", 
        key: "id"
      }
    },
    MenuItemId: {
      type: DataTypes.INTEGER, 
      references: { 
        model: "MenuItems", 
        key: "id"
      }
    }
  })
  
  return TagJoins;
};