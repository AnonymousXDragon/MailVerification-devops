'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      lastlogin: {
        type: Sequelize.DATE
      },
      isverified: {
        type: Sequelize.BOOLEAN
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      resetPasswordExpiresAt: {
        type: Sequelize.DATE
      },
      verificationToken: {
        type: Sequelize.STRING
      },
      verificationTokenExpiresAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('users');
  }
};