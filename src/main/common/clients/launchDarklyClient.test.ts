import config from 'config';
import { when } from 'jest-when';
import launchdarkly, { LDFlagValue } from 'launchdarkly-node-server-sdk';


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
      waitForInitialization: async (): Promise<any> => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variation: async (): Promise<any> => Promise.resolve({ testFlag: true }),
    };
  });

  test('Should initiate ldUser and client', function () {
    when(config.get as jest.Mock)
      .calledWith('launchDarkly.ldUser')
      .mockReturnValue('citizen-frontend');
    when(config.get as jest.Mock)
      .calledWith('launchDarkly.sdkKey')
      .mockReturnValue('sometestkey');


    const featureFlags = launchdarkly;
    expect(featureFlags['LDUser'].key).toEqual('citizen-frontend');
  //  expect(featureFlags['client']).toEqual(launchDarklyClient.serviceVariation('sometestkey', false));
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
});
