'use strict';

/**
 * Check user authenticated
 */
export function isLoggedIn ( req, res, next ) {
  if ( req.isAuthenticated() ) {
    return next();
  }

  res.json({ message: "authentication error" });
}
