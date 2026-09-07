jest.mock('config');

const mockStart = jest.fn();
const mockSetAutoCollectExceptions = jest.fn(() => ({ start: mockStart }));
const mockSetAutoCollectConsole = jest.fn(() => ({ setAutoCollectExceptions: mockSetAutoCollectExceptions }));
const mockSetSendLiveMetrics = jest.fn(() => ({ setAutoCollectConsole: mockSetAutoCollectConsole }));
const mockSetup = jest.fn(() => ({ setSendLiveMetrics: mockSetSendLiveMetrics }));
const mockTags = {};

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

import { AppInsights } from '.';

describe('AppInsights', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete mockTags['cloudRole'];
  });

  test('should initialise app insights with connection string', () => {
    config.get = jest.fn().mockImplementation((key: string) => {
      if (key === 'appInsights.connectionString') {
        return 'InstrumentationKey=test-key;IngestionEndpoint=https://example.com';
      }

      return false;
    });

    new AppInsights().enable();

    expect(mockSetup).toHaveBeenCalledWith('InstrumentationKey=test-key;IngestionEndpoint=https://example.com');
    expect(mockSetSendLiveMetrics).toHaveBeenCalledWith(true);
    expect(mockSetAutoCollectConsole).toHaveBeenCalledWith(true, true);
    expect(mockSetAutoCollectExceptions).toHaveBeenCalledWith(true);
    expect(mockTags['cloudRole']).toBe('prl-citizen-frontend');
    expect(mockStart).toHaveBeenCalled();
  });

  test('should convert legacy instrumentation key to connection string', () => {
    config.get = jest.fn().mockImplementation((key: string) => {
      if (key === 'appInsights.instrumentationKey') {
        return 'test-key';
      }

      return false;
    });

    new AppInsights().enable();

    expect(mockSetup).toHaveBeenCalledWith('InstrumentationKey=test-key');
  });

  test('should not initialise app insights when no config is present', () => {
    config.get = jest.fn().mockReturnValue(false);

    new AppInsights().enable();

    expect(mockSetup).not.toHaveBeenCalled();
  });
});
