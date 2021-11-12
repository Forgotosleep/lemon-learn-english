"use strict";

function format(data) {
  data.forEach((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    delete el.id;
  });

  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const levels = format(require("../data_seed/levels.json"));
    const categories = format(require("../data_seed/categories.json"));
    const users = format(require("../data_seed/users.json"));
    const classes = format(require("../data_seed/classes.json"));

    await queryInterface.bulkInsert("Levels", levels, {});
    await queryInterface.bulkInsert("Categories", categories, {});
    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Classes", classes, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Levels", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
