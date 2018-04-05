'use strict';

import bcrypt from 'bcrypt';

export default class DataHash {
  static getHash (value, rounds = 10) {
    return bcrypt.hash(value, rounds);
  }

  static checkHash (value, hash) {
    return bcrypt.compare(value, hash);
  }
}