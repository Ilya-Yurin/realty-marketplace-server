'use strict';

import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { SECRET_KEY, TOKEN_EXPIRES_IN } from '../../config/keys';

export default class Token {
  static createToken( data ) {
    return jwt.sign( { data }, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN } );
  }

  static getDataFromToken ( token ) {
    return this._validateToken( token );
  }

  static isTokenValid ( token ) {
    return _.isString( this._validateToken( token ) );
  }

  static _validateToken ( token ) {
    try {
      return jwt.verify( token, SECRET_KEY ).data;
    } catch (e) {
      return null;
    }
  }
}