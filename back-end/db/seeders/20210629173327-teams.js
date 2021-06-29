'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teams', [
      {
        name: 'test team 1:1',
        system_id: 1,
        faction: '[NCR]',
        points: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'test team 1:2',
        system_id: 1,
        faction: '[SOB]',
        points: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'test team 1:3',
        system_id: 1,
        faction: '[NCR]',
        points: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'test team 1:4',
        system_id: 1,
        faction: '[SOB]',
        points: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});
  }
};
