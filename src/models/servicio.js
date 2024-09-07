'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servicio.init({
    nombre: DataTypes.STRING,
    idcanal: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Servicio',
  });
  return Servicio;
};