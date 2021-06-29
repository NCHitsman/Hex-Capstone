'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Permissions', [ // 1: Can Edit, 2: Can Place Stuff, 3: Can View Only
      {
        user_id: 1,
        system_id: 1,
        level:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 2,
        system_id: 1,
        level:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 3,
        system_id: 1,
        level:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};
