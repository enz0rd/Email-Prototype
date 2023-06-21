'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    static associate(models) {
      Email.belongsTo(models.Usuario, { foreignKey: 'idusuario_origem', as: 'origem' });
      Email.belongsTo(models.Usuario, { foreignKey: 'idusuario_dest', as: 'destino' });
    }
  }
  Email.init({
    idusuario_origem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    idusuario_dest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    data_envio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Email',
  });
  // Email model

  return Email;
};
