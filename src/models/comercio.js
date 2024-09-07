'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comercio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comercio.init({
    nombreComercio: DataTypes.STRING,
    rtn: DataTypes.STRING,
    direccion: DataTypes.STRING,
    numTienda: DataTypes.STRING,
    nombreContacto: DataTypes.STRING,
    telefono: DataTypes.STRING,
    numUsuario: DataTypes.STRING,
    idCiudad: DataTypes.INTEGER,
    longitud: DataTypes.STRING,
    latitud: DataTypes.STRING,
    idTipoComercio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comercio',
  });
  return Comercio;
};