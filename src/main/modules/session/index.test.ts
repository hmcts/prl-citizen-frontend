jest.mock('config');
const mockCreateClient = jest.fn(() => 'MOCK redis client');
jest.mock('redis', () => {
  return {
    __esModule: true,
    createClient: mockCreateClient,
  };
});

const mockSessionFileStore = jest.fn();
jest.mock('session-file-store', () => {
  return {
    __esModule: true,
    default: jest.fn(() => jest.fn().mockImplementation(() => mockSessionFileStore)),
  };
});

const mockRedisStore = jest.fn();
jest.mock('connect-redis', () => {
  return {
    __esModule: true,
    default: jest.fn(() => jest.fn().mockImplementation(() => mockRedisStore)),
  };
});

const mockSession = jest.fn(() => 'MOCK session');
jest.mock('express-session', () => {
  return {
    __esModule: true,
    default: mockSession,
  };
});

jest.mock('cookie-parser', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 'MOCKED cookie-parser'),
  };
});

import config from 'config';
import { Application } from 'express';

import { SessionStorage } from '.';

describe('session', () => {
  let mockApp;

  beforeEach(() => {
    config.get = jest.fn().mockImplementationOnce(() => 'MOCK_SECRET');
    mockApp = {
      use: jest.fn(callback => callback),
    } as unknown as Application;

    new SessionStorage().enableFor(mockApp);
  });

  test('should use cookieParser middleware', () => {
    expect(mockApp.use).toHaveBeenNthCalledWith(1, 'MOCKED cookie-parser');
  });

  test('should use session middleware with FileStore', () => {
    expect(mockSession).toHaveBeenCalledWith({
      name: 'ds-ui-session',
      resave: false,
      saveUninitialized: false,
      secret: 'MOCK_SECRET',
      cookie: {
        httpOnly: true,
        maxAge: 1260000,
      },
      rolling: true,
      store: mockSessionFileStore,
    });
    expect(mockApp.use).toHaveBeenNthCalledWith(2, 'MOCK session');
  });

  describe('when redis host is available in config', () => {
    beforeEach(() => {
      config.get = jest
        .fn()
        .mockImplementationOnce(() => 'MOCK_SECRET')
        .mockImplementationOnce(() => 'MOCK_REDIS_HOST')
        .mockImplementationOnce(() => 'MOCK_REDIS_KEY');
      mockApp = {
        use: jest.fn(callback => callback),
        locals: {},
      } as unknown as Application;

      new SessionStorage().enableFor(mockApp);
    });

    test('should create redis client', () => {
      expect(mockCreateClient).toHaveBeenCalledWith({
        host: 'MOCK_REDIS_HOST',
        password: 'MOCK_REDIS_KEY',
        port: 6380,
        tls: true,
        connect_timeout: 15000,
      });
    });

    test('should use session middleware with SessionStore', () => {
      expect(mockApp.locals.redisClient).toEqual('MOCK redis client');
      expect(mockApp.use).toHaveBeenNthCalledWith(2, 'MOCK session');
    });
  });
});
