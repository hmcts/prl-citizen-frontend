import { Application } from 'express';

import { Routes } from './routes';
import { HOME_URL } from './steps/urls';

const mockHomeGetController = jest.fn();
jest.mock('./steps/home/get', () => {
  return {
    HomeGetController: jest.fn().mockImplementation(() => {
      return { get: mockHomeGetController };
    }),
  };
});
describe('Routes', () => {
  let appMock;
  beforeEach(() => {
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
    expect(appMock.get).toHaveBeenCalledWith(HOME_URL, mockHomeGetController);
  });
});
