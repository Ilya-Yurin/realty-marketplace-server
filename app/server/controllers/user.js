'use strict';

import passport from 'passport';
import UserService from '../../services/users';
import Token from '../../util/token';

class UsersController {

  constructor (router) {
    this.router = router;
    this.registerRoutes();

    return this.router;
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
