import config from 'config';
import { LDClient, LDFlagValue, LDUser, init } from 'launchdarkly-node-server-sdk';

const ldConfig = {
  offline: true,
};

export class LaunchDarklyClient {
  private static client: LDClient;

  constructor() {
    if (ldConfig.offline === false) {
      if (!LaunchDarklyClient.client) {
        const sdkKey: string = config.get<string>('featureToggles.launchDarklyKey');
        LaunchDarklyClient.client = init(sdkKey, ldConfig);
      }
    }
  }

  async initializeLD(): Promise<void> {
    if (LaunchDarklyClient.client) {
      await LaunchDarklyClient.client.waitForInitialization();
    }
  }

  async serviceVariation(featureKey: string, offlineDefault: LDFlagValue): Promise<LDFlagValue> {
    if (ldConfig.offline === false) {
      const roles: string[] = [];
      const ldUser: LDUser = {
        key: 'citizen-frontend',
        custom: {
          roles,
        },
      };

      return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
    }
    return true;
  }
}
