'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asignacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asignacion.init({
    idComercio: DataTypes.INTEGER,
    idServicio: DataTypes.INTEGER,
    idEquipo: DataTypes.INTEGER,
    tipoProblema: DataTypes.STRING,
    interpretacion: DataTypes.STRING,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asignacion',
  });
  return Asignacion;
};