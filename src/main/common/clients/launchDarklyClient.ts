import config from 'config';
import { LDClient, LDFlagValue, LDUser, init } from 'launchdarkly-node-server-sdk';

const ldConfig = {
  offline: false,
};

export class LaunchDarklyClient {
  private static client: LDClient;

  constructor() {
    console.log("config.get('launchDarkly.offline')", config.get('launchDarkly.offline'));
    if (config.get('launchDarkly.offline') === false) {
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
    if (config.get('launchDarkly.offline') === false) {
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
