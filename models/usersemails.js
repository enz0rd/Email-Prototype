'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersEmails extends Model {
    static associate(models) {
      UsersEmails.belongsTo(models.Email, { foreignKey: 'idemails' });
      UsersEmails.belongsTo(models.Usuario, { foreignKey: 'idusuarios' });
    }
  }
  UsersEmails.init({
    idemails: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Email',
        key: 'id'
      }
    },
    idusuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UsersEmails',
  });
  return UsersEmails;
};
