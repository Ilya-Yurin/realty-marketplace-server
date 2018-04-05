'use strict';

/* Vendor imports */
import express from 'express';
const cookieSession = require('cookie-session');
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import Promise from 'bluebird';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
/* Vendor imports */

/* Custom imports */
import CONFIG from '../../config/server_configurations';
import Logger from '../util/logger';
import RouteProvider from './controllers';
import { GOOGLE, session } from '../../config/keys'
import { user, Sequelize } from '../models/';
import { UserMapper } from '../mappers/';
/* Custom imports */

const LOG = Logger.getLogger('server');

export default class Server {
  static instance;
  
  constructor (server) {
    if (Server.instance) {
      return Server.instance;
    }


    passport.serializeUser((loggedUser, done) => done(null, loggedUser.id));

    passport.deserializeUser((id, done) => {
      user.findById(id).then((loggedUser) => done(null, loggedUser));
    });

    passport.use(
      new GoogleStrategy({
          clientID: GOOGLE.CLIENT_ID,
          clientSecret: GOOGLE.CLIENT_SECRET,
          callbackURL: GOOGLE.REDIRECT_URI
        }, async (accessToken, refreshToken, profile, done) => {
          const userData = UserMapper.fromGoogleToModel(profile);
          const result = await user.findOrCreateGoogleAccount(profile.id, userData);
          if (result instanceof Sequelize.Model) {
            done(null, result);
          } else {
            done(result, null);
          }
        })
    );


    this.server = server;

    this.server.use(cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [session.cookieKey]
    }));
    this.server.use( passport.initialize());
    this.server.use( passport.session());
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(compression());
    this.server.use('/', RouteProvider.getRoutes(express.Router()));
  }
  
  static getServerInstance () {
    if (Server.instance) {
      return Server.instance;
    }
    else {
      Server.instance = new Server(express());
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

