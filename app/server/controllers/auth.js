'use strict';

import Sequelize from 'sequelize';
import passport from 'passport';
import BaseController from './base-controller';
import Token from '../../util/token';
import { UserService } from '../../services/';

class AuthController extends BaseController {

  constructor (router) {
    super(router);
    this.registerRoutes();
  }

  registerRoutes () {
    this.router.post(
      '/login',
      passport.authenticate('local', { session: false } ),
      this.getAuthData.bind(this)
    );
    this.router.post(
      '/registrations',
      passport.authenticate('local-signup', { session: false }),
      this.getAuthData.bind(this)
    );
    this.router.post(
      '/google',
      passport.authenticate('google-token', { scope: ['email profile'], session: false }),
      this.googleAuth.bind(this)
    );
    this.router.get(
      '/self',
      passport.authenticate('jwt', { session: false }),
      this.getUser.bind(this)
    );
    this.router.patch(
      '/profile',
      passport.authenticate('jwt', { session: false }),
      this.updateProfile.bind(this)
    );
  }

  getAuthData(req, res) {
    res.json({ user: req.user, token: { access: Token.createToken(req.user.id) } });
  }

  getUser(req, res) {
    res.json({ user: req.user });
  }

  googleAuth (req, res) {
    if (req.user instanceof Sequelize.Model) {
      res.json({ user: req.user, token: { access: Token.createToken(req.user.id) } });
    } else {
      res.json({ user: req.user });
    }
  }

  async updateProfile (req,res) {
    const updatedUser = await UserService.update(req.user.id, req.body);
    if(updatedUser instanceof Error) {
      res.json({ error: updatedUser });
    } else {
      res.json({ user: updatedUser });
    }
  }
}
module.exports = AuthController;
