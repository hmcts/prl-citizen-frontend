import { AxiosError } from 'axios';
import { LoggerInstance } from 'winston';

import { logError } from './utils';

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

describe('case > utils', () => {
  describe('logError', () => {
    test('should log error with response', () => {
      logError(
        {
          response: { status: 500, data: 'error' },
          config: { method: 'GET', url: '/1234/download' },
        } as unknown as AxiosError,
        mockLogger
      );
      expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /1234/download 500');
    });

    test('should log error with request', () => {
      logError(
        {
          request: {},
          config: { method: 'GET', url: '/1234/download' },
        } as unknown as AxiosError,
        mockLogger
      );
      expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /1234/download 500');
    });

    test('should log error with message', () => {
      logError(
        {
          message: 'Error message',
          config: { method: 'GET', url: '/1234/download' },
        } as unknown as AxiosError,
        mockLogger
      );
      expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /1234/download 500');
    });
  });
});
