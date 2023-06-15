'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Privileges',[{
      userId:1,
      userType:'admin',
      createdAt:new Date(),
      updatedAt:new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Privileges', null, {});
  }
};
