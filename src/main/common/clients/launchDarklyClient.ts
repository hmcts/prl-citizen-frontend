import config from 'config';
import * as ld from 'ldclient-node';
import { LDFlagValue } from 'ldclient-node';

const sdkKey: string = config.get<string>('featureToggles.launchDarklyKey');
const ldConfig = {
  offline: config.get<boolean>('launchDarkly.offline'),
};

export class LaunchDarklyClient {
  private static client: ld.LDClient;

  constructor() {
    if (!LaunchDarklyClient.client) {
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
    console.log('offlineDefault' + offlineDefault);
    console.log('ldConfig.offline ' + ldConfig.offline);
    //console.log(LaunchDarklyClient.client.isOffline());
    //await LaunchDarklyClient.client.waitForInitialization();
    //console.log();
    //console.log(LaunchDarklyClient.client.allFlagsState.toString);
    //const test = (await LaunchDarklyClient.client.allFlagsState(ldUser)).getFlagValue(featureKey);
    //console.log(LaunchDarklyClient.client.isOffline());
    //console.log('test   -' + test);
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
    //.variation(featureKey, ldUser, offlineDefault);
  }
}
