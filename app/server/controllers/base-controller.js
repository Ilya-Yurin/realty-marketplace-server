'use strict';

class BaseController {
  constructor (router) {
    this.router = router;
  }

  getRouter () {
    return this.router;
  }
}

module.exports = BaseController;
