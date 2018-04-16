'use strict';

import _ from 'lodash';
import { User } from '../model_interfaces/';

export default class UserMapper {
  static fromGoogleToModel (rawData) {
    const user = new User();

    user.email = _.get(rawData, 'emails.[0].value');
    user.firstName = _.get(rawData, 'name.givenName');
    user.lastName = _.get(rawData, 'name.familyName');
    user.imageUrl = _.get(rawData, 'photos.[0].value');
    user.googleId = _.get(rawData, 'id' );

    return user;
  }

  static fromRawData (rawData) {
    const user = new User();

    user.firstName = _.get(rawData, 'first_name');
    user.lastName = _.get(rawData, 'last_name');
    user.email = _.get(rawData, 'email');
    user.phone = _.get(rawData, 'phone');
    user.password = _.get(rawData, 'password');

    return user;
  }
}
