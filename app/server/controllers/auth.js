'use strict';

import passport from 'passport';
import UserService from '../../services/users';

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
    this.router.get('/users', this.getUsers.bind(this))
  }

  handleGoogleCallback (req, res) {
    res.json(req.user);
  }

  getUsers (req, res) {
    return UserService.getList().then(result => {
      res.json(result);
    });
  }
}
module.exports = AuthController;
