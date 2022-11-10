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

  async initializeLD(): Promise<void> {
    await LaunchDarklyClient.client.waitForInitialization();
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
    // await LaunchDarklyClient.client.waitForInitialization();
    LaunchDarklyClient.client.variationDetail(featureKey, ldUser, 'default', detail => {
      const detailValue = detail.value;
      console.log('detailValue' + detailValue);
      const detailIndex = detail.variationIndex;
      console.log('detailIndex' + detailIndex);
      const detailReason = detail.reason;
      console.log('detailReason' + detailReason);
    });
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
    //.variation(featureKey, ldUser, offlineDefault);
  }
}
