'use strict';

import { user } from '../models/';

class UserService {
  constructor (users) {
    this.users = users;
  }

  async getList () {
    try {
      return await this.users.findAll();
    } catch (error) {
      return error;
    }
  }

  async createAccount (userData) {
    //TODO add validation
    try {
      return await this.users.create(userData);
    } catch (error) {
      return error;
    }
  }

  async findById (id) {
    //TODO add validation
    try {
      return await this.users.findById(id);
    } catch (error) {
      return error;
    }
  }

  async update (id, data) {
    //TODO add validation
    try {
      const userInstance = await this.users.findById(id);
      return await userInstance.update(data);
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserService(user);