'use strict';

import AuthRoutes from '../controllers/auth';
import UsersRoutes from '../controllers/user';

export default class RouteProvider {
  static getRoutes ( router) {
    router.use('/api', router);
    router.use('/v1', router);
    router.use('/auth', new AuthRoutes(router));
    router.use('/users', new UsersRoutes(router));

    router.all('/*', (req, res) => res.status(404).send({ message: 'Route not found' }));

    return router;
  }
}
