'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicidad_Regalia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Publicidad_Regalia.init({
    nombre: DataTypes.STRING,
    idAgente: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Publicidad_Regalia',
  });
  return Publicidad_Regalia;
};