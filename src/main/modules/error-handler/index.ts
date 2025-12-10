import { Application, NextFunction, Request, Response } from 'express';
import { LoggerInstance } from 'winston';

import { AppRequest } from '../../app/controller/AppRequest';
import { ErrorController } from '../../steps/error/error.controller';

const setupErrorHandler =
  logger =>
  renderError =>
  render =>
  async (...args): Promise<void> => {
    try {
      await render(...args);
    } catch (err) {
      const [req, res] = args as [AppRequest, Response];
      logger?.error('Unhandled error in wrapped route', {
        path: req.path,
        method: req.method,
        userId: (req as AppRequest).session?.user?.id,
        caseId: (req as AppRequest).session?.userCase?.id,
        error: err,
      });
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

    app.locals.errorHandler = setupErrorHandler(logger)(errorController.internalServerError);
  }

  public handleNextErrorsFor(app: Application): void {
    app.use((err: Error | string | undefined, req: Request, res: Response, next: NextFunction): void => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        next();
      }
    });
  }
}
