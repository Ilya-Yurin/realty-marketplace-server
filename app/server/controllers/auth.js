'use strict';

import passport from 'passport';
import UserService from '../../services/users';
import { isLoggedIn } from '../middleware/';

class AuthController {

  constructor (router) {
    this.router = router;
    this.registerRoutes();

    return this.router;
  }

  registerRoutes () {
    this.router.get('/google', passport.authenticate('google', { scope: ['openid email profile'] }));
    // callback route for google to redirect to
    this.router.get('/google/redirect', passport.authenticate('google'), this.handleGoogleCallback.bind(this));
    this.router.get('/users', this.getUsers.bind(this));
    this.router.get('/self', isLoggedIn, this.getSelf.bind(this));
    this.router.get('/logout', this.logout.bind(this));
  }

  handleGoogleCallback (req, res) {
    res.json(req.user);
  }

  getUsers (req, res) {
    return UserService.getList().then(result => {
      res.json(result);
    });
  }

  getSelf(req, res) {
    res.json(req.user);
  }

  logout (req, res) {
    req.logout();
    res.json({msg: 'User is logged out'});
  }
}
module.exports = AuthController;
