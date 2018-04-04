'use strict';

import passport from 'passport';

export default class AuthRoutes {
  static getRoutes (router) {
    router.get( '/google', passport.authenticate('google', { scope: ['openid email profile'] }));

    // callback route for google to redirect to
    router.get( '/google/redirect', passport.authenticate('google'), (req, res) => {
      res.json(req.user);
    });

    return router;
  }
}
