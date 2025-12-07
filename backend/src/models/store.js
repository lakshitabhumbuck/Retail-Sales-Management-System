import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Store', {
    storeId: { type: DataTypes.STRING, primaryKey: true },
    location: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'stores',
    timestamps: false
  });
};
