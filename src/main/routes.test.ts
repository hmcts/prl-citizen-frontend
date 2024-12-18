/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from 'express';

import { RAProvider } from '../main/modules/reasonable-adjustments/index';
import { mockRequest } from '../test/unit/utils/mockRequest';
import { mockResponse } from '../test/unit/utils/mockResponse';

import { Routes } from './routes';

const mockCSRFTokenError = jest.fn();
const mockNotFound = jest.fn();
jest.mock('./steps/error/error.controller', () => {
  return {
    ErrorController: jest.fn().mockImplementation(() => {
      return { CSRFTokenError: mockCSRFTokenError, notFound: mockNotFound };
    }),
  };
});

jest.spyOn(RAProvider, 'isComponentEnabled').mockImplementation(() => Promise.resolve(true));
jest.spyOn((RAProvider as any).route, 'enable');

describe('Routes', () => {
  let appMock;
  beforeEach(() => {
    jest.clearAllMocks();
    appMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
    } as unknown as Application;
    new Routes().enableFor(appMock);
  });

  test('should setup routes', () => {
    expect(appMock.get).toHaveBeenCalledWith('/csrf-token-error', mockCSRFTokenError);
  });

  test('should sanitize request body', () => {
    const req = mockRequest({ body: { too_shortStatement: 'test<img src""> ☕️' } });
    const res = mockResponse();
    const mockNext = jest.fn();
    const routes = new Routes();

    routes.enableFor(appMock);
    routes['sanitizeRequestBody'](req, res, mockNext);

    expect(req.body).toEqual({ too_shortStatement: 'test' });
  });

  test('should sanitize request body for arrays', () => {
    const req = mockRequest({
      body: { courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder<img src""> ☕️'] },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    const routes = new Routes();

    routes.enableFor(appMock);
    routes['sanitizeRequestBody'](req, res, mockNext);

    expect(req.body).toEqual({ courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder'] });
  });
});
