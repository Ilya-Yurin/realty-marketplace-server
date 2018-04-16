'use strict';

import bcrypt from 'bcrypt';

export default class DataHash {
  static getHash (value, rounds = 10) {
    return bcrypt.hash(value, rounds);
  }

  static async checkHash (value, hash) {
    try {
      return await bcrypt.compare(value, hash);
    } catch (error) {
      return false;
    }
  }
}