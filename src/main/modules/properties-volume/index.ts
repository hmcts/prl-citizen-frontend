import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      this.setSecret('secrets.prl.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.prl.prl-citizen-frontend-idam-client-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.prl.microservicekey-prl-citizen-frontend', 'services.authProvider.secret');
      this.setSecret('secrets.prl.system-update-user-username', 'services.idam.systemUsername');
      this.setSecret('secrets.prl.system-update-user-username', 'services.idam.systemPassword');
      set(config, 'services.case.url', 'https://manage-case.aat.platform.hmcts.net/cases');
    } else {
      this.setLocalSecret('prl-citizen-frontend-idam-client-secret', 'services.idam.clientSecret');
      this.setLocalSecret('microservicekey-prl-citizen-frontend', 'services.authProvider.secret');
      //this.setLocalSecret('adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
      this.setSecret('secrets.prl.system-update-user-username', 'services.idam.systemUsername');
      this.setSecret('secrets.prl.system-update-user-username', 'services.idam.systemPassword');
      this.setSecret('secrets.prl.postcode-lookup-token', 'services.postcodeLookup.token');
      // this.setLocalEndpoints();
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  /**
   * Load a secret from the AAT vault using azure cli
   */
  private setLocalSecret(secret: string, toPath: string): void {
    const result = execSync(`az keyvault secret show --vault-name prl-aat -o tsv --query value --name ${secret}`);
    set(config, toPath, result.toString().replace('\n', ''));
  }
}
