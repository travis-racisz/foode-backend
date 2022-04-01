
module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define('Options', { 
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    optionsGroup_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: "OptionsGroup",
            key: "id"
        }
    }
  })
  Options.associate = (models) => {
    Options.belongsTo(models.OptionsGroup, {
        foreignKey: "optionsGroup_id"})
  }
  return Options;
};