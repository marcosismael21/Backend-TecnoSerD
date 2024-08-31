'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comodin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comodin.init({
    nombre: DataTypes.STRING,
    noSerie: DataTypes.STRING,
    noImei: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comodin',
  });
  return Comodin;
};