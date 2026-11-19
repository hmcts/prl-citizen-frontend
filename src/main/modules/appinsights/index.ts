import config from 'config';
import { LoggerInstance } from 'winston';

const appInsights = require('applicationinsights');

export class AppInsights {
  enable(logger: LoggerInstance): void {
    const appInsightsKey = config.get('appInsights.connectionString');

    if (appInsightsKey) {
      const appInsightsConfig = appInsights
        .setup(appInsightsKey)
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true);

      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'prl-citizen-frontend';
      appInsightsConfig.start();
      logger.info('App Insights enabled');
    } else {
      logger.info('App Insights not enabled: connection string not found');
    }
  }
}
