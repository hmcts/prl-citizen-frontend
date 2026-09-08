import config from 'config';

const appInsights = require('applicationinsights');

export class AppInsights {
  enable(): void {
    const appInsightsKey = config.get('appInsights.instrumentationKey');

    if (appInsightsKey) {
      const appInsightsConfig = appInsights
        .setup(appInsightsKey)
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true);

      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'prl-citizen-frontend';
      appInsightsConfig.start();
    }
  }
}
