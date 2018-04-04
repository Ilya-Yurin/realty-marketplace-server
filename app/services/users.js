'use strict';

import { user } from '../models/';

class UserService {
  constructor () {
    this.users = [];
  }

  getList () {
    return user.findAll()
      .then( list => {
        return list;
      })
      .catch( e => {
        return e;
      });
  }
}

module.exports = new UserService();