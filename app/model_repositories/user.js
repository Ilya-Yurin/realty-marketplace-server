'use strict';

import _ from 'lodash';

import { user } from '../models/';
import { Sequelize } from 'sequelize'
//Sequelize exposes symbol operators that can be used for to create more
// complex comparisons
const Op = Sequelize.Op

export default class UserRepository {
  static findByEmail (email) {
    try {
      return user.find({ where: { email } });
    } catch (error) {
      return error;
    }
  }

  static findSocialAccount (filter) {
    try {
      return user.find({
        where: {
          [Op.or]: this.createSocialQueryProperty(filter),
        },
      });
    } catch (error) {
      return error;
    }
  }

  static createSocialQueryProperty (filter) {
    const queryFilterProps = [];
    if(_.has(filter, 'email') && !_.isNull(filter.email)) {
      queryFilterProps.push({email: filter.email});
    }
    if(_.has(filter, 'google_id') && !_.isNull(filter.google_id)) {
      queryFilterProps.push({google_id: filter.google_id});
    }
    return queryFilterProps;
  }
}