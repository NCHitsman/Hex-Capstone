'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Team_Players', [
      {
        user_id: 1,
        team_id: 1,
        captain: true,
        system_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 2,
        team_id: 1,
        captain: false,
        system_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 3,
        team_id: 1,
        captain: false,
        system_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Team_Players', null, {});
  }
};
