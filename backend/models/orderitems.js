module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('OrderItems', { 
    qty: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.INTEGER,
    order_id: { 
      type: DataTypes.INTEGER, 
      references: { 
        model: "Orders", 
        key: "id"
      }
    },
    combo: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
  })

  OrderItems.associate = (models) => { 
    OrderItems.belongsTo(models.Orders, { 
      foreignKey: "id"
    })
  }
  return OrderItems;
};