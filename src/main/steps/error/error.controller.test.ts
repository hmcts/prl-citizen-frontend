import { AxiosError } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';

import { errorContent } from './content';
import { ErrorController, HTTPError } from './error.controller';

import Mock = jest.Mock;

describe('ErrorController', () => {
  const controller = new ErrorController();

  test('Should render not found', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.notFound(req, res);
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.info.mock.calls[0][0]).toContain('404 Not Found: /request');
    expect(res.statusCode).toBe(404);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
      ...errorContent.en[404],
    });
  });

  test('Should render error page with supplied status code', async () => {
    const err = { status: 400, message: 'Bad request' } as unknown as HTTPError;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.error.mock.calls[0][0]).toContain('Bad request');
    expect(res.statusCode).toBe(err.status);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
      ...errorContent.en[400],
    });
  });

  test('Should render error pages and fall back to a 500 error if status not given', async () => {
    const err = { message: 'Bad request' } as unknown as HTTPError;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.error.mock.calls[0][0]).toContain('Bad request');
    expect(res.statusCode).toBe(500);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
      ...errorContent.en[500],
    });
  });

  test('Renders the error page with correct status code and logs the details', async () => {
    const err = new HTTPError('Bad request', 400);
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.error.mock.calls[0][0]).toContain('HTTPError: Bad request');
    expect(res.statusCode).toBe(400);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
      ...errorContent.en[400],
    });
  });

  test('Should render CSRF token error page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.CSRFTokenError(req, res);
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.error.mock.calls[0][0]).toContain('CSRF Token Failed');
    expect(res.statusCode).toBe(400);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
      ...errorContent.en[400],
    });
  });

  test('Only calls res.render() once when multiple errors have been caught', () => {
    const req = mockRequest();
    const res = mockResponse();
    controller.internalServerError(undefined, req, res);
    controller.internalServerError(undefined, req, res);
    controller.internalServerError(undefined, req, res);
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.error).toHaveBeenCalledTimes(3);
    expect(logger.error.mock.calls[0][0]).toBe('Internal Server Error');
    expect(res.statusCode).toBe(500);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
      ...errorContent.en[500],
    });
  });

  test("Doesn't throw an error if it cannot retrieve the user email e.g. if the service-auth-token is invalid/VPN down", () => {
    const req = mockRequest({ session: { user: undefined, userCase: undefined } });
    const res = mockResponse();

    controller.internalServerError(
      {
        isAxiosError: true,
        response: {
          data: {
            error_description: 'Authorization code expired.',
            error: 'invalid_grant',
          },
        },
        message: 'Error: Request failed with status code 400',
      } as unknown as AxiosError,
      req,
      res
    );
    const logger = req.locals.logger as unknown as MockedLogger;

    expect(logger.error).toHaveBeenCalledWith('Error: Request failed with status code 400', {
      error_description: 'Authorization code expired.',
      error: 'invalid_grant',
    });
    expect(res.statusCode).toBe(500);
    expect(res.render).toBeCalledWith('error/error', {
      ...generatePageContent({ language: 'en' }),
      ...errorContent.en[500],
    });
  });
});

interface MockedLogger {
  info: Mock;
  error: Mock;
}