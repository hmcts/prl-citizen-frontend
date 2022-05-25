//import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      this.setSecret('secrets.prl.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.prl.prl-cos-idam-client-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.prl.microservicekey-prl-cos-api', 'services.authProvider.secret');
    } else {
      //this.setLocalSecret('prl-cos-idam-client-secret', 'services.idam.clientSecret');
      //this.setLocalSecret('microservicekey-prl-cos-api', 'services.authProvider.secret');
      set(config, 'services.idam.clientSecret', 'W7supXKMJgcEWKBS');
      set(config, 'services.authProvider.secret', 'GT2V6PLQ34XGPTPM');


      // this.setLocalSecret('adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
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
  // private setLocalSecret(secret: string, toPath: string): void {
  //   const result = execSync(`az keyvault secret show --vault-name prl-aat -o tsv --query value --name ${secret}`);
  //   set(config, toPath, result.toString().replace('\n', ''));
  // }
c
  // private setLocalEndpoints(): void {
  //   const result = execSync('az keyvault secret show --vault-name adoption-aat -o tsv --query value --name endpoints');
  //   const decoded = Buffer.from(result.toString().replace('\n', ''), 'base64');

  //   const endpoints = JSON.parse(decoded.toString());

  //   set(config, 'services.authProvider.url', endpoints.s2s);
  //   set(config, 'services.idam.authorizationURL', endpoints.idamWeb);
  //   set(config, 'services.idam.tokenURL', endpoints.idamToken);
  //   set(config, 'services.case.url', endpoints.ccd);
  // }
}
