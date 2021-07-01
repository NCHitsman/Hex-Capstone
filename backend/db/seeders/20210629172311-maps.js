"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Maps", [
      {
        name: "Test World 1:1",
        type: "[PLT]",
        system_id: 1,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 1:2",
        type: "[STA]",
        system_id: 1,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 1:3",
        type: "[AST]",
        system_id: 1,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 2:1",
        type: "[PLT]",
        system_id: 2,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 2:2",
        type: "[STA]",
        system_id: 2,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 2:3",
        type: "[AST]",
        system_id: 2,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 3:1",
        type: "[PLT]",
        system_id: 3,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 3:2",
        type: "[STA]",
        system_id: 3,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World 3:3",
        type: "[AST]",
        system_id: 3,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Test World A",
        type: "[PLT]",
        system_id: 4,
        size: 64,
        map_seed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Maps", null, {});
  }
};
