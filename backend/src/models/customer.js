import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Customer', {
    customerId: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.INTEGER, allowNull: true },
    region: { type: DataTypes.STRING, allowNull: true },
    customerType: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'customers',
    timestamps: false
  });
};
