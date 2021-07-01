'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Permissions', [ // 1: Can Edit, 2: Can Place Stuff, 3: Can View Only
      {
        user_id: 1,
        system_id: 1,
        level:1,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 2,
        system_id: 1,
        level:3,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 3,
        system_id: 1,
        level:4,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 1,
        system_id: 2,
        level:1,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 1,
        system_id: 3,
        level:1,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 1,
        system_id: 4,
        level:2,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 2,
        system_id: 4,
        level:1,
        status:'[ACPT]',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 3,
        system_id: 4,
        level:4,
        status:'[PEND]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};
