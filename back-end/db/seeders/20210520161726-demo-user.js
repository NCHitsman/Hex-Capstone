'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo1@user.io',
        username: 'Demo1',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'demo2@user.io',
        username: 'Demo2',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'demo3@user.io',
        username: 'Demo3',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo1', 'Demo2', 'Demo3'] }
    }, {});
  }
};
