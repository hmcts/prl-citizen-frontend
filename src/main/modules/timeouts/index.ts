// import config from 'config';
import { Application } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppRequest } from '../../app/controller/AppRequest';
import { ErrorController, HTTPError } from '../../steps/error/error.controller';

export class LoadTimeouts {
  public enableFor(app: Application): void {
    const timeoutMs = 1000;

    app.use((req, res, next) => {
      const errorController = new ErrorController();

      // Set the timeout for all HTTP requests
      req.setTimeout(timeoutMs, () => {
        const err = new HTTPError('Request Timeout', StatusCodes.REQUEST_TIMEOUT);
        errorController.internalServerError(err, req as AppRequest, res);
      });

      // Set the server response timeout for all HTTP requests
      res.setTimeout(timeoutMs, () => {
        const err = new HTTPError('Service Unavailable', StatusCodes.SERVICE_UNAVAILABLE);
        errorController.internalServerError(err, req as AppRequest, res);
      });

      next();
    });
  }
}
