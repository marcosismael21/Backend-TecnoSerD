'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Equipo.init({
    idTipoEquipo: DataTypes.INTEGER,
    noserie: DataTypes.STRING,
    noimei: DataTypes.STRING,
    pin: DataTypes.STRING,
    puk: DataTypes.STRING,
    fechaLlegada: DataTypes.DATE,
    comodin: DataTypes.BOOLEAN,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Equipo',
    tableName: 'equipos',
  });
  return Equipo;
};