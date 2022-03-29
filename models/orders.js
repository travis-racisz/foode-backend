module.exports = (sequelize, DataTypes) => {
const Orders = sequelize.define('Orders', { 
  user_id: DataTypes.INTEGER,
  driver_id: DataTypes.INTEGER,
  status: DataTypes.STRING,
  specialRequests: DataTypes.STRING,
  price: DataTypes.INTEGER
})
  Orders.associate = (models) => { 
    Orders.hasMany(models.OrderItems, { 
      foreignKey: "order_id"
    })

    Orders.belongsTo(models.Users, { 
      foreignKey: "id"
    })
  }
  return Orders;
};