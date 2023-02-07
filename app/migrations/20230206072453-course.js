"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cousres", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allownull: false,
        primaryKey: true,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      createdByUser: {
        type: Sequelize.UUID,
        refrences: {
          model: "students",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cousres", null, {});
  },
};
