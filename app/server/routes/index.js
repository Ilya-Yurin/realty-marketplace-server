'use strict';

import AuthRoutes from '../controllers/auth';

export default class RouteProvider {
  static getRoutes ( router) {
    router.use('/api', router);
    router.use('/v1', router);
    router.use('/auth', new AuthRoutes(router));

    router.all('/*', (req, res) => res.status(404).send({ message: 'Route not found' }));

    return router;
  }
}
