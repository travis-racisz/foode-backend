
module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define('Options', { 
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    menuItemId: { 
        type: DataTypes.INTEGER,
        references: { 
            model: "MenuItems",
            key: "id"
        }
    }, 
    priceId: DataTypes.STRING,
    optionsGroupId: { 
        type: DataTypes.INTEGER,
        references: {
            model: "OptionsGroup",
            key: "id"
        }
    }
  })
  return Options;
};