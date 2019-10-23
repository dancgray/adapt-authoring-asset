const { AbstractModule, Responder } = require('adapt-authoring-core');

/**
* Module to expose assets API
* @extends {AbstractModule}
*/
class AssetsModule extends AbstractModule {
  /** @override */
  preload(app, resolve, reject) {
    app.getModule('server').api.createChildRouter('asset').addRoute({
      route: '/',
      handlers: { get: (req, res) => new Responder(res).json().success(this.queryAsset()) }
    });
    app.auth.secureRoute('/api/asset', 'get', ['read:asset']);
    resolve();
  }

  /**
  * Returns the file for the server from its config
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  queryAsset() {
    return {};
  }
}

module.exports = AssetsModule;
