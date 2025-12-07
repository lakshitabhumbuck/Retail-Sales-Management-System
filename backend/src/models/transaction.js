import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Transaction', {
    transactionId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    pricePerUnit: { type: DataTypes.FLOAT, allowNull: false },
    discountPercentage: { type: DataTypes.FLOAT, allowNull: true },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    finalAmount: { type: DataTypes.FLOAT, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    orderStatus: { type: DataTypes.STRING, allowNull: false },
    deliveryType: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true } // PostgreSQL array
  }, {
    tableName: 'transactions',
    timestamps: false
  });
};
