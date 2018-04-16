'use strict';

import passport from 'passport';
import Token from '../../util/token';
import { UserService } from '../../services/';

class AuthController {

  constructor (router) {
    this.router = router;
    this.registerRoutes();

    return this.router;
  }

  registerRoutes () {
    this.router.post('/login', passport.authenticate('local', { session: false } ), this.getAuthData.bind(this));
    this.router.post('/registrations', passport.authenticate('local-signup', { session: false }), this.getAuthData.bind(this));
    this.router.get('/google', passport.authenticate('google', { scope: ['email profile'] }));
    // callback route for google to redirect to
    this.router.get('/google/redirect', passport.authenticate('google', { session: false }), this.handleGoogleCallback.bind(this));
    this.router.get('/self', passport.authenticate('jwt', {session: false}), this.getUser.bind(this));
    this.router.patch('/profile', passport.authenticate('jwt', {session: false}), this.updateProfile.bind(this));
  }

  getAuthData(req, res) {
    res.json({ user: req.user, token: { access: Token.createToken(req.user.id) } });
  }

  getUser(req, res) {
    res.json({ user: req.user });
  }

  handleGoogleCallback (req, res) {
    res.json({ user: req.user, token: { access: Token.createToken(req.user.id) } });
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
