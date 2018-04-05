'use strict';

import { Model } from 'sequelize';

const USER_TYPES = ['user', 'realtor', 'admin']
exports.USER_TYPES = {  };

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
        values: [USER_TYPES],
        defaultValue: 'user'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
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
  user.findOrCreateGoogleAccount = async (google_id, data) => {
    try{
      const userInstance = await user.find({where: {google_id}});

      if (userInstance instanceof Model) {
        return userInstance;
      }
      else {
        return user.createNewRecord(data.toJson());
      }
    } catch(error) {
      return error;
    }
  }

  user.findBy = async (filter) => {
    try{
      return await user.find({where: filter});
    } catch(error) {
      return error;
    }
  }

  user.createNewRecord = async(data) => {
    const instance = user.build(data);
    return await instance.save();
  }
  /* /Class methods */

  /* Instance Methods */
  user.prototype.toJSON = function () {
    delete this.dataValues.password;
    return this.get();
  }
  /* /Instance Methods */

  return user
}
