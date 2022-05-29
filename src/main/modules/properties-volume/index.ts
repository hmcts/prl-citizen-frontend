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
     this.setLocalEndpoints();
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

   pri//vate setLocalSecret(secret: string, toPath: string): void {
  //   const result = execSync(`az keyvault secret show --vault-name prl-aat -o tsv --query value --name ${secret}`);
  //   set(config, toPath, result.toString().replace('\n', ''));
  // }

  private setLocalEndpoints(): void {
    const result = 'eyJzMnMiOiJodHRwOi8vcnBlLXNlcnZpY2UtYXV0aC1wcm92aWRlci1hYXQuc2VydmljZS5jb3JlLWNvbXB1dGUtYWF0LmludGVybmFsIiwiaWRhbVdlYiI6Imh0dHBzOi8vaWRhbS13ZWItcHVibGljLmFhdC5wbGF0Zm9ybS5obWN0cy5uZXQvbG9naW4iLCJpZGFtVG9rZW4iOiJodHRwczovL2lkYW0tYXBpLmFhdC5wbGF0Zm9ybS5obWN0cy5uZXQvby90b2tlbiIsImNjZCI6Imh0dHA6Ly9jY2QtZGF0YS1zdG9yZS1hcGktYWF0LnNlcnZpY2UuY29yZS1jb21wdXRlLWFhdC5pbnRlcm5hbCIsImZlZVJlZ2lzdGVyIjoiaHR0cDovL2ZlZXMtcmVnaXN0ZXItYXBpLWFhdC5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1hYXQuaW50ZXJuYWwvZmVlcy1yZWdpc3Rlci9mZWVzL2xvb2t1cCIsImRtU3RvcmUiOiJodHRwOi8vZG0tc3RvcmUtYWF0LnNlcnZpY2UuY29yZS1jb21wdXRlLWFhdC5pbnRlcm5hbCIsInBheW1lbnRzIjoiaHR0cDovL3BheW1lbnQtYXBpLWFhdC5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1hYXQuaW50ZXJuYWwiLCJwY3EiOiJodHRwczovL3BjcS5hYXQucGxhdGZvcm0uaG1jdHMubmV0IiwiY2RhbSI6Imh0dHA6Ly9jY2QtY2FzZS1kb2N1bWVudC1hbS1hcGktYWF0LnNlcnZpY2UuY29yZS1jb21wdXRlLWFhdC5pbnRlcm5hbCJ9';
    const decoded = Buffer.from(result.toString().replace('\n', ''), 'base64');
    const endpoints = JSON.parse(decoded.toString());
    set(config, 'services.authProvider.url', endpoints.s2s);
    set(config, 'services.idam.authorizationURL', endpoints.idamWeb);
    set(config, 'services.idam.tokenURL', endpoints.idamToken);
    set(config, 'services.case.url', endpoints.ccd);
  }
}