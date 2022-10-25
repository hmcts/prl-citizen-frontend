import config from 'config';
import * as ld from 'ldclient-node';
import { LDFlagValue } from 'ldclient-node';

const ldConfig = {
  offline: true,
};

export class LaunchDarklyClient {
  private static client: ld.LDClient;

  constructor() {
    if (!LaunchDarklyClient.client) {
      const sdkKey: string = config.get('featureToggles.launchDarklyKey');
      ldConfig.offline = config.get('launchDarkly.offline');
      console.log('sdkKeysdkKey and offline ' + sdkKey + ' - ' + ldConfig.offline);
      LaunchDarklyClient.client = ld.init(sdkKey, ldConfig);
    }
  }

  /*async userVariation(user: User, roles: string[], featureKey: string, offlineDefault): Promise<ld.LDFlagValue> {
    const ldUser: ld.LDUser = {
      key: user.id,
      custom: {
        roles,
      },
    };
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
  }*/

  async serviceVariation(featureKey: string, offlineDefault: LDFlagValue): Promise<ld.LDFlagValue> {
    const roles: string[] = [];
    const ldUser: ld.LDUser = {
      key: 'citizen-frontend',
      custom: {
        roles,
      },
    };
    await LaunchDarklyClient.client.waitForInitialization();
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
  }
}
