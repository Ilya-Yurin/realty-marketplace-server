'use strict';

import { USERS_CONSTANT } from '../constant/';

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: USERS_CONSTANT.USER_TYPES,
        defaultValue: USERS_CONSTANT.USER,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'users',
    })

  /* Class methods */

  /* /Class methods */

  /* Instance Methods */
  user.prototype.toJSON = function () {
    delete this.dataValues.password;
    return this.get();
  }

  user.prototype.isAdmin = function () {
    return this.get().type === `${USERS_CONSTANT.ADMIN}`;
  }

  user.prototype.isRealtor = function () {
    return this.get().type === `${USERS_CONSTANT.REALTOR}`;
  }
  /* /Instance Methods */

  return user;
}
