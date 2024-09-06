'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTipoEquipo: {
        type: Sequelize.INTEGER
      },
      noserie: {
        type: Sequelize.STRING
      },
      noimei: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.STRING
      },
      puk: {
        type: Sequelize.STRING
      },
      fechaLlegada: {
        type: Sequelize.DATE
      },
      comodin: {
        type: Sequelize.BOOLEAN
      },
      estado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Equipos');
  }
};