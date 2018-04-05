'use strict';

/**
 * Check user authenticated
 */
export function isLoggedIn ( req, res, next ) {
  if ( req.isAuthenticated() ) {
    return next();
  }

  res.status(401).send( {msg: "error"} );
}