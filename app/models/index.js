'use strict';

import _ from 'lodash';

const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};
let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync( __dirname )
  .filter( file => ( file.indexOf( '.' ) !== 0 ) && ( file !== 'index.js' ) )
  .forEach( file => {
    const model = sequelize.import( path.join( __dirname, file ) );
    db[ model.name ] = model;
  });

Object.keys(db).forEach(modelName => {
  _.isFunction(db[modelName].associate) && db[modelName].associate(db)
});


db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
