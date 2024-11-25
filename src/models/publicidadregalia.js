'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicidadRegalia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PublicidadRegalia.init({
    nombre: DataTypes.STRING,
    idTipoComercio: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PublicidadRegalia',
    tableName: 'publicidadregalias',
  });
  return PublicidadRegalia;
};