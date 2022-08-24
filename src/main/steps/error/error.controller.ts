import autobind from 'autobind-decorator';
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppRequest } from '../../app/controller/AppRequest';
import { Language, generatePageContent } from '../common/common.content';

import { errorContent } from './content';

@autobind
export class ErrorController {
  /**
   * Catch all for 404
   */
  public notFound(req: AppRequest, res: Response): void {
    req.locals.logger.info(`404 Not Found: ${req.originalUrl}`);

    res.statusCode = StatusCodes.NOT_FOUND;
    this.render(req, res);
  }

  /**
   * Catch all for 500 errors
   */
  public internalServerError(error: Errors, req: AppRequest, res: Response): void {
    const { message = error, stack = undefined } = typeof error === 'object' ? error : {};

    let response;
    if (typeof error === 'object' && (error as AxiosError).isAxiosError) {
      response = (error as AxiosError).response?.data as AxiosResponse<string | Record<string, unknown>>;
    }

    req.locals.logger.error(`${stack || message || 'Internal Server Error'}`, response);

    res.statusCode = (error as HTTPError)?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.render(req, res);
  }

  /**
   * Catch all for CSRF Token errors
   */
  public CSRFTokenError(req: AppRequest, res: Response): void {
    req.locals.logger.error('CSRF Token Failed');

    res.statusCode = StatusCodes.BAD_REQUEST;
    this.render(req, res);
  }

  private render(req: AppRequest, res: Response) {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const language = (req.session?.lang || 'en') as Language;
    const errorText =
      errorContent[language][res.statusCode] || errorContent[language][StatusCodes.INTERNAL_SERVER_ERROR];
    const commonContent = generatePageContent({
      language,
      userEmail: req.session?.user?.email,
      userCaseList: req.session.userCaseList,
    });
    res.locals.isError = true;

    res.status(res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
    res.render('error/error', { ...commonContent, ...errorText });
  }
}

export class HTTPError extends Error {
  constructor(public message: string, public status = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
  }
}

export type Errors = Error | HTTPError | AxiosError | string | undefined;
