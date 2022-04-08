import { Application } from 'express';

export class Webpack {
  public enableFor(app: Application): void {
    if (app.locals.developmentMode) {
      const webpackDev = require('webpack-dev-middleware');
      const webpack = require('webpack');
      const webpackconfig = require('../../../../webpack.config');
      const compiler = webpack(webpackconfig);
      app.use(webpackDev(compiler, { publicPath: 'src/main/public/' }));
    }
  }
}
