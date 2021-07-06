'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Team_Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Teams' },
        onDelete: 'CASCADE',
      },
      captain: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      system_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Systems' },
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('Team_Players');
  }
};
