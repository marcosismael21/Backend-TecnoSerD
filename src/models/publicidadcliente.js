'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicidadCliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PublicidadCliente.init({
    idPublicidad: DataTypes.INTEGER,
    idCliente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PublicidadCliente',
    tableName: 'publicidadclientes',
  });
  return PublicidadCliente;
};