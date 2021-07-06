'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teams', [
      {
        name: 'test team 1:1',
        system_id: 1,
        captain_id: 1,
        faction: '[NCR]',
        points: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'test team 1:2',
        system_id: 1,
        captain_id: 2,
        faction: '[SOB]',
        points: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});
  }
};
