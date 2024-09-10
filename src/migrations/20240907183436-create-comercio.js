'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comercios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreComercio: {
        type: Sequelize.STRING
      },
      rtn: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      numTienda: {
        type: Sequelize.STRING
      },
      nombreContacto: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      numUsuario: {
        type: Sequelize.STRING
      },
      idCiudad: {
        type: Sequelize.INTEGER
      },
      longitud: {
        type: Sequelize.STRING
      },
      latitud: {
        type: Sequelize.STRING
      },
      idTipoComercio: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comercios');
  }
};