'use strict';

const USER = 'user';
const REALTOR = 'realtor';
const ADMIN = 'admin';
const USER_TYPES = [`${USER}`, `${REALTOR}`, `${ADMIN}`];

module.exports = Object.freeze({
  USER,
  REALTOR,
  ADMIN,
  USER_TYPES
});