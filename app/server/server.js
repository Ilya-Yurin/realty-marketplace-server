'use strict';

/* Vendor imports */
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import Promise from 'bluebird';
/* Vendor imports */

/* Custom imports */
import CONFIG from '../../config/server_configurations';
import Logger from '../util/logger';
import RouteProvider from './controllers';
import { user } from '../models/';
import PassportWrapper from './passport-strategy';
/* Custom imports */

const LOG = Logger.getLogger('server');

export default class Server {
  static instance;
  
  constructor (server, passport) {
    if (Server.instance) {
      return Server.instance;
    }

    passport.serializeUser((loggedUser, done) => {
      return done(null, loggedUser.id);
    });
    passport.deserializeUser((id, done) => {
      return user.findById(id).then((loggedUser) => {
        return done(null, loggedUser);
      })
    });

    this.server = server;
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(passport.initialize());
    this.server.use(cors());
    this.server.use(compression());
    this.server.use('/', RouteProvider.getRoutes(express.Router()));
  }
  
  static getServerInstance () {
    if (Server.instance) {
      return Server.instance;
    }
    else {
      Server.instance = new Server(express(), PassportWrapper.getPassport());

      return Server.instance;
    }
  }
  
  start () {
    return new Promise((resolve, reject) => {
      try {
        this._conn = this.server.listen(CONFIG.server.port, CONFIG.server.host, () => resolve());
      } catch (e) {
        return reject(e);
      }
    });
  }
  
  stop () {
    return new Promise((resolve, reject ) => {
      if (!this._conn) {
        LOG.info('Server is not running');
        reject(Error('Server is not running'));
      }
    
      this._conn.close(() => {
        LOG.info('Server is stopped');
        return resolve();
      });
      this._conn = null;
    });
  }
}

