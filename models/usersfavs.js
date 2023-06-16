'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersFavs extends Model {
    static associate(models) {
      UsersFavs.belongsTo(models.Usuario, { foreignKey: 'id_usuario_fav' });
      UsersFavs.belongsTo(models.Usuario, { foreignKey: 'id_usuario_origem' });
    }
  }
  UsersFavs.init({
    id_usuario_fav: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    id_usuario_origem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UsersFavs',
  });
  return UsersFavs;
};
