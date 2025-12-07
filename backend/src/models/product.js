
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Product', {
    productId: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'products',
    timestamps: false
  });
};
