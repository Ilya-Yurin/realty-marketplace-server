'use strict';

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { GOOGLE, SECRET_KEY } from '../../config/keys'
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import { Sequelize } from '../models';
import { UserRepository } from '../model_repositories';
import { UserMapper } from '../mappers';
import { Strategy as LocalStrategy } from "passport-local";
import DataHash from '../util/data-hash';
import { UserService } from '../services/';

export default class PassportWrapper {
  static getPassport () {
    passport.use(this.localStrategy());
    passport.use('local-signup', this.localSignUpStrategy());
    passport.use('jwt', this.jWTLocalStrategy());
    passport.use(this.googleStrategy());

    return passport
  }

  static localStrategy () {
    return new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
      const userInstance = await UserRepository.findByEmail(email);
      const hashPassword = userInstance instanceof Sequelize.Model
        ? userInstance.get().password
        : null;

      if (await DataHash.checkHash( password, hashPassword)) {
        return done(null, userInstance);
      } else {
        return done(null, false);
      }
    });
  }

  static jWTLocalStrategy () {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY
    };
    return new JwtStrategy(jwtOptions, async(jwtPayload, done) => {
      const userInstance = await UserService.findById(jwtPayload.data);
      if (userInstance instanceof Sequelize.Model) {
        return done(null, userInstance);
      } else {
        return done(userInstance, null);
      }
    });
  }

  static localSignUpStrategy () {
    const strategyConfig = { usernameField: 'email', passReqToCallback: true };
    return new LocalStrategy(strategyConfig, async (userData, email, password, done) => {
      const userInstance = await UserRepository.findByEmail(email);

      if (userInstance instanceof Sequelize.Model) {
        return done({ message: 'This email already taken' }, null);
      } else {
        delete userData.type; //user cannot specify a type when registering
        const userRawData = UserMapper.fromRawData(userData.body);
        userRawData.password = await DataHash.getHash(userRawData.password);
        const newUser = await UserService.createAccount(userRawData.toJson());


        if (newUser instanceof Sequelize.Model) {
          return done(null, newUser);
        } else {
          return done(newUser, null);
        }
      }
    });
  }

  static googleStrategy () {
    return new GoogleTokenStrategy({
        clientID: GOOGLE.CLIENT_ID,
        clientSecret: GOOGLE.CLIENT_SECRET,
      }, async (accessToken, refreshToken, profile, done) => {
        const userRawData = UserMapper.fromGoogleToModel(profile);
        const userInstance = await UserRepository.findSocialAccount({
          email: userRawData.email,
          google_id: userRawData.googleId,
        });

        if (userInstance instanceof Sequelize.Model) {
          done(null, await userInstance.update(userRawData.socialIds));
        } else {
          done(null, userRawData.toClientJson());
        }
      });
  }
}