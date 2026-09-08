import config from 'config';

const appInsights = require('applicationinsights');

export class AppInsights {
  private static readonly INGESTION_ENDPOINT = 'https://uksouth-0.in.applicationinsights.azure.com/';
  private static readonly LIVE_ENDPOINT = 'https://uksouth.livediagnostics.monitor.azure.com/';

  enable(): void {
    const appInsightsConnectionString = this.getConnectionString();

    if (appInsightsConnectionString) {
      const appInsightsConfig = appInsights
        .setup(appInsightsConnectionString)
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true);

      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'prl-citizen-frontend';
      appInsightsConfig.start();
    }
  }

  private getConnectionString(): string | false {
    const connectionString = config.get('appInsights.connectionString') as string | false;

    if (connectionString) {
      return connectionString;
    }

    const instrumentationKey = config.get('appInsights.instrumentationKey') as string | false;

    if (!instrumentationKey) {
      return false;
    }

    return instrumentationKey.includes('InstrumentationKey=')
      ? this.withEndpoints(instrumentationKey)
      : this.withEndpoints(`InstrumentationKey=${instrumentationKey}`);
  }

  private withEndpoints(connectionString: string): string {
    if (connectionString.includes('IngestionEndpoint=')) {
      return connectionString;
    }

    return `${connectionString};IngestionEndpoint=${AppInsights.INGESTION_ENDPOINT};LiveEndpoint=${AppInsights.LIVE_ENDPOINT}`;
  }
}
