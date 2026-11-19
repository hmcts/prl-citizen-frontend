jest.mock('config');

const mockStart = jest.fn();
const mockSetAutoCollectExceptions = jest.fn(() => ({ start: mockStart }));
const mockSetAutoCollectConsole = jest.fn(() => ({ setAutoCollectExceptions: mockSetAutoCollectExceptions }));
const mockSetSendLiveMetrics = jest.fn(() => ({ setAutoCollectConsole: mockSetAutoCollectConsole }));
const mockSetup = jest.fn(() => ({ setSendLiveMetrics: mockSetSendLiveMetrics }));
const mockTags = {};
const mockLogger = {
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

jest.mock('applicationinsights', () => ({
  setup: mockSetup,
  defaultClient: {
    context: {
      keys: {
        cloudRole: 'cloudRole',
      },
      tags: mockTags,
    },
  },
}));

import config from 'config';
import { LoggerInstance } from 'winston';

import { AppInsights } from '.';

describe('AppInsights', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete mockTags['cloudRole'];
  });

  test('should initialise app insights with connection string', () => {
    config.get = jest.fn().mockReturnValue('test-key');

    new AppInsights().enable(mockLogger);

    expect(config.get).toHaveBeenCalledWith('appInsights.connectionString');
    expect(mockSetup).toHaveBeenCalledWith('test-key');
    expect(mockSetSendLiveMetrics).toHaveBeenCalledWith(true);
    expect(mockSetAutoCollectConsole).toHaveBeenCalledWith(true, true);
    expect(mockSetAutoCollectExceptions).toHaveBeenCalledWith(true);
    expect(mockTags['cloudRole']).toBe('prl-citizen-frontend');
    expect(mockStart).toHaveBeenCalled();
  });

  test('should not initialise app insights when no config is present', () => {
    config.get = jest.fn().mockReturnValue(false);

    new AppInsights().enable(mockLogger);

    expect(mockSetup).not.toHaveBeenCalled();
  });
});
