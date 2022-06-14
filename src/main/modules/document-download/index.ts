import config from 'config';
import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
//import { DocumentType, /* YesOrNo */ } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

const proxy = require('express-http-proxy');

export class DocumentDownloadMiddleware {
  public enableFor(app: Application): void {
    const documentManagementTarget = config.get('services.documentManagement.url');

    const addHeaders = proxyReqOpts => {
      proxyReqOpts.headers['ServiceAuthorization'] = getServiceAuthToken();
      proxyReqOpts.headers['user-roles'] = 'citizen';
      return proxyReqOpts;
    };

    const dmStoreProxyForApplicationPdf = {
      endpoints: ['/downloads/prl-citizen-frontend/application'],
      path: (req: AppRequest) => {
        console.log('hit url : ' + req.url);
        // return req.session.userCase?.documentsUploaded
        // .find(doc => doc.value.documentType === DocumentType.APPLICATION)
        //   ?.value.documentLink.document_binary_url
      },
    };

    // const dmStoreProxyForRespondentAnswersPdf = {
    //   endpoints: ['/downloads/respondent-answers'],
    //   path: (req: AppRequest) => {
    //     return req.session.userCase?.documentsGenerated
    //       .concat(req.session.userCase?.documentsUploaded)
    //       .find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS)?.value.documentLink
    //       .document_binary_url;
    //   },
    // };

    // const dmStoreProxyForCertificateOfServicePdf = {
    //   endpoints: ['/downloads/certificate-of-service'],
    //   path: (req: AppRequest) => {
    //     return req.session.userCase?.alternativeServiceOutcomes
    //     .find(doc =>
    //         doc.value.successfulServedByBailiff === YesOrNo.YES &&
    //         doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
    //     )?.value.certificateOfServiceDocument.documentLink.document_binary_url;
    //   },
    // };

    const dmStoreProxies = [
      dmStoreProxyForApplicationPdf,
      //dmStoreProxyForRespondentAnswersPdf,
      //dmStoreProxyForCertificateOfServicePdf,
    ];

    for (const dmStoreProxy of dmStoreProxies) {
      app.use(
        dmStoreProxy.endpoints,
        proxy(documentManagementTarget, {
          proxyReqPathResolver: dmStoreProxy.path,
          proxyReqOptDecorator: addHeaders,
          secure: false,
          changeOrigin: true,
        })
      );
    }
  }
}
