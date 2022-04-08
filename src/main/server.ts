import * as path from 'path';

import * as bodyParser from 'body-parser';
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';



import { AxiosLogger } from './modules/axios-logger';
import { ErrorHandler } from './modules/error-handler';;
import { Nunjucks } from './modules/nunjucks';
import { StateRedirectMiddleware } from './modules/state-redirect';
import { TooBusy } from './modules/too-busy';
import { Webpack } from './modules/webpack';
import { LanguageToggle } from './modules/i18n';
import { Routes } from './routes';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();
app.enable('trust proxy');
app.locals.developmentMode = true;
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

new AxiosLogger().enableFor(app);
new ErrorHandler().enableFor(app, logger);
new Nunjucks().enableFor(app);
new Webpack().enableFor(app);
new TooBusy().enableFor(app);
new StateRedirectMiddleware().enableFor(app);
new LanguageToggle().enableFor(app);
new Routes().enableFor(app);
new ErrorHandler().handleNextErrorsFor(app);

const port = 3000;
const server = app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});

process.on('SIGINT', function () {
  server.close();
  toobusy.shutdown();
  process.exit();
});




