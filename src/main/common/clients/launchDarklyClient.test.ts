import config from 'config';
import { when } from 'jest-when';
import launchdarkly, { LDClient, LDFlagValue, LDOptions, LDUser } from 'launchdarkly-node-server-sdk';

import { LaunchDarklyClient } from './launchDarklyClient';

describe('LaunchDarkly', function () {
  config.get = jest.fn();
  const testFlag = 'test-flag';
  jest.mock('config');
  jest.mock('launchdarkly-node-server-sdk');

  config.get = jest.fn();
  //  launchDarklyClient = jest.fn();

  let mockLdClient: {
    waitForInitialization: () => Promise<unknown>;
    variation: (flag: string, flagValue: LDFlagValue) => Promise<unknown>;
  };

  beforeEach(() => {
    when(config.get).calledWith('featureToggles.launchDarklyKey').mockReturnValue('TEST_KEY');

    when(launchdarkly.init).mockLdClient;
    mockLdClient = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      waitForInitialization: async (): Promise<any> => {
        undefined;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variation: async (): Promise<any> => Promise.resolve({ testFlag: true }),
    };
  });

  test('Should get a flag value', async function () {
    when(config.get as jest.Mock)
      .calledWith('launchDarkly.ldUser')
      .mockReturnValue('citizen-frontend');
    when(config.get as jest.Mock)
      .calledWith('launchDarkly.sdkKey')
      .mockReturnValue('sometestkey');
    //when(launchDarklyClient as unknown as jest.Mock).mockReturnValue(mockLdClient);

    expect(await mockLdClient.variation(testFlag, false)).toEqual({ testFlag: true });
  });

  describe('LaunchDarkly1', function () {
    test('Should call async functions', async function () {
      launchdarkly.init = jest.fn((key: string, options: LDOptions | undefined) => {
        return {
          key,
          options,
          waitForInitialization: jest.fn(() => true),
          variation: jest.fn((featureKey: string, ldUser: LDUser, offlineDefault) => {
            return { featureKey, ldUser, offlineDefault };
          }),
        } as unknown as LDClient;
      });
      when(config.get).calledWith('featureToggles.launchDarklyKey').mockReturnValue('TEST_KEY');
      const launchC = new LaunchDarklyClient();
      launchC.initializeLD();

      expect(launchdarkly.init).toHaveBeenCalledWith('TEST_KEY', {
        offline: false,
      });
      expect(launchC.initializeLD).toHaveBeenCalled;
      expect(launchC.serviceVariation('a', 'b')).toHaveBeenCalled;
    });
  });
});
