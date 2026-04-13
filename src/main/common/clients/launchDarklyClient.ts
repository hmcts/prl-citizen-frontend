import { LDClient, LDContext, LDFlagValue, init } from '@launchdarkly/node-server-sdk';
import config from 'config';

const ldConfig = {
  offline: false,
};

export class LaunchDarklyClient {
  private static client: LDClient;

  constructor() {
    if (!LaunchDarklyClient.client) {
      const sdkKey: string = config.get<string>('featureToggles.launchDarklyKey');
      LaunchDarklyClient.client = init(sdkKey, ldConfig);
    }
  }

  async initializeLD(): Promise<void> {
    if (LaunchDarklyClient.client) {
      await LaunchDarklyClient.client.waitForInitialization();
    }
  }

  async serviceVariation(featureKey: string, offlineDefault: LDFlagValue): Promise<LDFlagValue> {
    const roles: string[] = [];

    const ldContext: LDContext = {
      kind: 'user',
      key: 'citizen-frontend',
      roles,
    };

    return LaunchDarklyClient.client.variation(featureKey, ldContext, offlineDefault);
  }
}
