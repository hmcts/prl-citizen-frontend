import { Application, NextFunction, Request, Response } from 'express';
import { LoggerInstance } from 'winston';

import { AppRequest } from '../../app/controller/AppRequest';
import { ErrorController } from '../../steps/error/error.controller';

const setupErrorHandler =
  renderError =>
  render =>
  async (...args): Promise<void> => {
    try {
      await render(...args);
    } catch (err) {
      const [req, res] = args as [AppRequest, Response];
      renderError(err, req, res);
    }
  };

const errorController = new ErrorController();

export class ErrorHandler {
  public enableFor(app: Application, logger: LoggerInstance): void {
    app.use((req, res, next) => {
      req['locals'] = req['locals'] || {};
      req['locals'].logger = logger;
      next();
    });

    process.on('unhandledRejection', (reason, p) => {
      logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });

    app.locals.errorHandler = setupErrorHandler(errorController.internalServerError);
  }

  public handleNextErrorsFor(app: Application): void {
    app.use((err: Error | string | undefined, req: Request, res: Response, next: NextFunction) => {
      if (err) {
        return errorController.internalServerError(err, req as AppRequest, res);
      }
      next();
    });
  }
}
