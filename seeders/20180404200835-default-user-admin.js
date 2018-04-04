'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      id: '00000000-0000-0000-0000-000000000000',
      first_name: 'User',
      last_name: 'Admin',
      username: 'user',
      email: 'admin@realty.com',
      type: 'admin',
      password: '$2a$10$WHd5V1TWvQ7SKteifpSk5O8T0BMJJ8q5JE/OGb/OGVrLZKMYHZgSW',
      salt: '123123123123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};