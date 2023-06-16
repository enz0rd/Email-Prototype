'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pinned extends Model {
    static associate(models) {
      Pinned.belongsTo(models.Usuario, { foreignKey: 'idusuarios' });
      Pinned.belongsTo(models.Email, { foreignKey: 'idemails' });
    }
  }
  Pinned.init({
    idusuarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    idemails: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Email',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Pinned',
  });
  return Pinned;
};
