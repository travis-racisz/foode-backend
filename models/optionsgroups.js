module.exports = (sequelize, DataTypes) => {
  const OptionsGroup = sequelize.define('OptionsGroups', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    numberOfChoices: DataTypes.INTEGER
  })
  return OptionsGroup;
};