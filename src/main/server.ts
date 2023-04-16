import * as path from 'path';

import * as bodyParser from 'body-parser';
import config = require('config');
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';

import { FeatureToggles } from './app/utils/featureToggles';
import { LaunchDarklyClient } from './common/clients/launchDarklyClient';
import { AppInsights } from './modules/appinsights';
import { AuthProvider } from './modules/auth-provider';
import { AxiosLogger } from './modules/axios-logger';
import { CSRFToken } from './modules/csrf';
import { ErrorHandler } from './modules/error-handler';
import { FeatureToggleProvider } from './modules/feature-toggle';
import { FileUpload } from './modules/fileupload';
import { HealthCheck } from './modules/health';
import { Helmet } from './modules/helmet';
import { LanguageToggle } from './modules/i18n';
import { Nunjucks } from './modules/nunjucks';
import { OidcMiddleware } from './modules/oidc';
//import { StateRedirectMiddleware } from './modules/state-redirect';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { TooBusy } from './modules/too-busy';
import { Webpack } from './modules/webpack';
import { Routes } from './routes';

const { Logger } = require('@hmcts/nodejs-logging');

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const developmentMode = env === 'development';
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();
app.locals.ENV = env;
app.enable('trust proxy');
app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));
logger.info('Creating LaunchDarkly Client');
const launchDarklyClient = new LaunchDarklyClient();
const featureToggles = new FeatureToggles(launchDarklyClient);
app.use(async (req, res, next) => {
  if (app.locals.developmentMode) {
    app.settings.nunjucksEnv.globals.c100Rebuild = await featureToggles.isC100reBuildEnabled();
    logger.info('c100Rebuild ::' + (await featureToggles.isC100reBuildEnabled()));
    app.settings.nunjucksEnv.globals.testingSupport = await featureToggles.isTestingSupportEnabled();
    logger.info('testingSupport ::' + (await featureToggles.isTestingSupportEnabled()));
  }
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');

  next();
});
new AxiosLogger().enableFor(app);
new PropertiesVolume().enableFor(app);
new ErrorHandler().enableFor(app, logger);
new Helmet(config.get('security')).enableFor(app);
new AppInsights().enable();
new FileUpload().enableFor(app);
new SessionStorage().enableFor(app);
new Nunjucks().enableFor(app);
new CSRFToken().enableFor(app);
new AuthProvider().enable();
new OidcMiddleware().enableFor(app);
new Webpack().enableFor(app);
new TooBusy().enableFor(app);
new HealthCheck().enableFor(app);
new LanguageToggle().enableFor(app);
new Routes().enableFor(app);
new ErrorHandler().handleNextErrorsFor(app);
new FeatureToggleProvider().enable(app);

setupDev(app, developmentMode);

const port: number = parseInt(process.env.PORT || '3001', 10);
if (app.locals.ENV === 'development') {
  const server = app.listen(port, () => {
    logger.info(`Application started: http://localhost:${port}`);
  });
  process.on('SIGINT', function () {
    server.close();
    toobusy.shutdown();
    process.exit();
  });
} else {
  app.listen(port, () => {
    logger.info(`Application started: http://localhost:${port}`);
  });
}
