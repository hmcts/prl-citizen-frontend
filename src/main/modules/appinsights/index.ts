import config from 'config';

const appInsights = require('applicationinsights');

export class AppInsights {
  enable(): void {
    if (config.get('secrets.prl.AppInsightsInstrumentationKey')) {
      appInsights
        .setup(config.get('secrets.prl.AppInsightsInstrumentationKey'))
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .start();

      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'prl-citizen-frontend';
      appInsights.defaultClient.trackTrace({ message: 'App insights activated' });
    }
  }
}
