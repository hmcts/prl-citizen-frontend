import { Application } from 'express';

import { RARoute } from './route';

describe('Route', () => {
  let appMock;
  beforeEach(() => {
    jest.clearAllMocks();
    appMock = {
      get: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
    } as unknown as Application;
    RARoute.enable(appMock);
  });

  test('should setup routes', () => {
    expect(appMock.get).toHaveBeenCalledTimes(4);
  });
});
