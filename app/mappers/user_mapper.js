'use strict';

import _ from 'lodash';
import { User } from '../model_interfaces/';

export default class UserMapper {
  static fromGoogleToModel (rawData) {
    const user = new User();

    user.email = _.get(rawData, '_json.email');
    user.firstName = _.get(rawData, '_json.given_name');
    user.lastName = _.get(rawData, '_json.family_name');
    user.imageUrl = _.get(rawData, '_json.picture');
    user.googleId = _.get(rawData, '_json.id' );
    user.link = _.get(rawData, '_json.link' );

    return user;
  }

  static fromRawData (rawData) {
    const user = new User();

    user.firstName = _.get(rawData, 'first_name');
    user.lastName = _.get(rawData, 'last_name');
    user.email = _.get(rawData, 'email');
    user.phone = _.get(rawData, 'phone');
    user.password = _.get(rawData, 'password');
    user.imageUrl = _.get(rawData, 'image_url');

    return user;
  }
}
