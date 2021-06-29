'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Systems', [
        {
          owner_id: 1,
          name: 'Test System 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          owner_id: 1,
          name: 'Test System 2',
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          owner_id: 1,
          name: 'Test System 3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Systems', null, {});
  }
};
