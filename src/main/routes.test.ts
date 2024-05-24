/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from 'express';

import { RAProvider } from '../main/modules/reasonable-adjustments/index';

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
});
