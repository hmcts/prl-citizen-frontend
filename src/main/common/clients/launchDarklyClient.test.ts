import { LDClient, LDContext, LDFlagValue, init } from '@launchdarkly/node-server-sdk';
import config from 'config';
import { when } from 'jest-when';

import { LaunchDarklyClient } from './launchDarklyClient';

jest.mock('@launchdarkly/node-server-sdk', () => {
  const originalModule = jest.requireActual('@launchdarkly/node-server-sdk');
  return {
    __esModule: true,
    ...originalModule,
    init: jest.fn(),
  };
});
jest.mock('config');

describe('LaunchDarkly', function () {
  const testFlag = 'test-flag';
  let mockLdClient: LDClient;

  beforeEach(() => {
    (config.get as jest.Mock).mockReset();
    when(config.get as jest.Mock)
      .calledWith('featureToggles.launchDarklyKey')
      .mockReturnValue('TEST_KEY');

    mockLdClient = {
      waitForInitialization: jest.fn().mockResolvedValue(true),
      variation: jest.fn((featureKey: string, ldUser: LDContext, offlineDefault: LDFlagValue) => {
        return { featureKey, ldUser, offlineDefault };
      }),
    } as unknown as LDClient;

    (init as jest.Mock).mockReturnValue(mockLdClient);
  });

  test('Should get a flag value from mockLdClient directly', async function () {
    when(config.get as jest.Mock)
      .calledWith('launchDarkly.ldUser')
      .mockReturnValue('citizen-frontend');
    when(config.get as jest.Mock)
      .calledWith('launchDarkly.sdkKey')
      .mockReturnValue('sometestkey');

    const result = await mockLdClient.variation(testFlag, {} as LDContext, false);
    expect(result).toEqual({ featureKey: testFlag, ldUser: {}, offlineDefault: false });
  });

  describe('LaunchDarkly1', function () {
    test('Should call async functions through LaunchDarklyClient', async function () {
      const launchC = new LaunchDarklyClient();
      await launchC.initializeLD();
      const variationResult = await launchC.serviceVariation('a', 'b');

      expect(init).toHaveBeenCalledWith('TEST_KEY', { offline: false });
      expect(mockLdClient.waitForInitialization).toHaveBeenCalled();
      expect(mockLdClient.variation).toHaveBeenCalledWith('a', expect.any(Object), 'b');
      expect(variationResult).toEqual({ featureKey: 'a', ldUser: expect.any(Object), offlineDefault: 'b' });
    });
  });
});
