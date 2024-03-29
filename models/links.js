
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Links.init({
    generatedlink: DataTypes.STRING,
    expired: DataTypes.BOOLEAN, 
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Links',
  });
  return Links;
};