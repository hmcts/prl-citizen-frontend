import config = require('config');
import * as ld from 'ldclient-node';
import { LDFlagValue } from 'ldclient-node';

const sdkKey: string = config.get('featureToggles.launchDarklyKey');
console.log('--sdkkey --' + sdkKey);
console.log('print config---' + config);
const ldConfig = {
  offline: false,
};

export class LaunchDarklyClient {
  private static client: ld.LDClient;

  constructor() {
    if (!LaunchDarklyClient.client) {
      console.log('sdkKeysdkKey' + sdkKey);
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
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
  }
}
