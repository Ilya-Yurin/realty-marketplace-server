'use strict';

import passport from 'passport';
import BaseController from './base-controller';
import UserService from '../../services/users';

class UsersController extends BaseController {

  constructor (router) {
    super(router);
    this.registerRoutes();
  }

  registerRoutes () {
    this.router.get('/', passport.authenticate('jwt', {session: false}), this.getList.bind(this));
  }

  getList (req, res) {
    UserService.getList().then(result => {
      res.json(result);
    });
  }
}
module.exports = UsersController;
