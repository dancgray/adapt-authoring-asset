const AbstractApiModule = require('adapt-authoring-api');
const { Utils } = require('adapt-authoring-core');
/**
* Abstract module which handles course assets
* @extends {AbstractApiModule}
*/
class AssetApiModule extends AbstractApiModule {
  /** @override */
  static get def() {
    return {
      name: 'asset',
      routes: [
        {
          route: '/:_id?',
          handlers: ['post','get','put','delete']
        }
      ]
    };
  }
  /** @override */
  preload(app, resolve, reject) {
    const asset = this.app.getModule('asset');
    asset.on('preload', () => {
      /**
      * Router instance
      * @type {Router}
      */
      Utils.defineGetter(this, 'router', asset.router.createChildRouter(this.constructor.def.name));
      this.initMiddleware();
      this.initRoutes();
      resolve();
    });
  }
}

module.exports = AssetApiModule;
