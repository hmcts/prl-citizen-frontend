import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    console.log('app.locals.developmentMode::' + app.locals.developmentMode);
    if (!app.locals.developmentMode) {
      console.log('inside generic env setup');
      propertiesVolume.addTo(config);
      this.setSecret('secrets.prl.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.prl.prl-citizen-frontend-idam-client-secret', 'services.idam.citizenClientSecret');
      this.setSecret('secrets.prl.postcode-lookup-token', 'services.postcodeLookup.token');
      this.setSecret('secrets.prl.prl-cos-idam-client-secret', 'services.idam.cosApiClientSecret');
      this.setSecret('secrets.prl.microservicekey-prl-cos-api', 'services.authProvider.secret');
      this.setSecret('secrets.prl.system-update-user-username', 'services.idam.systemUsername');
      this.setSecret('secrets.prl.system-update-user-password', 'services.idam.systemPassword');
      //this.setSecret('secrets.prl.citizen-upload-docs-email', 'services.citizen.uploadDocsEmail');
    } else {
      console.log('inside develop env setup');
      this.setLocalSecret('prl-cos-idam-client-secret', 'services.idam.cosApiClientSecret');
      this.setLocalSecret('prl-citizen-frontend-idam-client-secret', 'services.idam.citizenClientSecret');
      this.setLocalSecret('microservicekey-prl-cos-api', 'services.authProvider.secret');
      this.setLocalSecret('system-update-user-username', 'services.idam.systemUsername');
      this.setLocalSecret('system-update-user-password', 'services.idam.systemPassword');
      //this.setLocalEndpoints();
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    console.log('***** setting values *********');
    console.log('fromPath is ' + fromPath);
    if (config.has(fromPath)) {
      console.log('config is available ' + config.get(fromPath));
      console.log('fromPath is available ' + fromPath);
      console.log('toPath is available ' + toPath);
      console.log('get(config, fromPath) ' + get(config, fromPath));
      set(config, toPath, get(config, fromPath));
      console.log('validating set ' + config.get(toPath));
      console.log('its a success');
    }
  }

  /**
   * Load a secret from the AAT vault using azure cli
   */
  private setLocalSecret(secret: string, toPath: string): void {
    const result = execSync(`az keyvault secret show --vault-name prl-aat -o tsv --query value --name ${secret}`);
    console.log('******* config is ' + config);
    set(config, toPath, result.toString().replace('\n', ''));
  }
}
