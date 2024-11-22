'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publicidadComercio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  publicidadComercio.init({
    idPublicidadRegalia: DataTypes.INTEGER,
    idComercio: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'publicidadComercio',
  });
  return publicidadComercio;
};