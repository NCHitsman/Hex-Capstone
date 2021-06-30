'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      system_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Systems' }
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      map_seed: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Maps');
  }
};
