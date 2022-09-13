import https from 'https';

import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { Response } from 'express';

import { getServiceAuthTokenForPRLCitizen } from '../../../../app/auth/service/get-service-auth-token';
import { FieldPrefix } from '../../../../app/case/case';
import { EmergencyCourtDocument } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';
import { C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD } from '../../../urls';

import { PRL_COS_URL } from './postController';

@autobind
export default class EmergencyDocumentUpload extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async removeDocument(req: AppRequest, res: Response): Promise<void> {
    const { removeId, orderType } = req.query;
    this.removeExistedDocument(removeId as string, req, res, orderType as string);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }
    const { orderType } = req.query;
    if (req.query.hasOwnProperty('removeId') && req.query.hasOwnProperty('orderType')) {
      this.removeDocument(req, res);
    } else {
      let currentOrderDocument: EmergencyCourtDocument | undefined = {
        orderType: '',
        id: '',
        document_url: '',
        document_filename: '',
        document_binary_url: '',
      };

      if (req.session.userCase.hasOwnProperty('emergencyuploadedDocuments')) {
        currentOrderDocument = req.session.userCase.emergencyuploadedDocuments?.filter(
          document => document.orderType === orderType
        )[0];
      }

      const language = super.getPreferredLanguage(req) as Language;

      const content = generatePageContent({
        language,
        pageContent: this.content,
        userCase: req.session?.userCase,
        userEmail: req.session?.user?.email,
      });

      const sessionErrors = req.session?.errors || [];
      if (req.session?.errors) {
        req.session.errors = undefined;
      }

      super.clearConfidentialitySessionSaveData(req);
      res.render(this.view, {
        ...content,
        sessionErrors,
        htmlLang: language,
        orderType,
        postURL: C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD,
        document: currentOrderDocument,
      });
    }
  }

  public removeExistedDocument = async (
    docId: string,
    req: AppRequest,
    res: Response,
    orderType: string
  ): Promise<void> => {
    try {
      const Headers = {
        Authorization: `Bearer ${req.session.user['accessToken']}`,
        ServiceAuthorization: 'Bearer ' + (await getServiceAuthTokenForPRLCitizen()),
      };
      const deleteDocumentPath = `/${docId}/delete`;
      await this.DeleteDocumentInstance(PRL_COS_URL, Headers).delete(deleteDocumentPath);
      req.session.userCase.emergencyuploadedDocuments = req.session.userCase.emergencyuploadedDocuments?.filter(
        document => document.id !== docId
      );
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD + '?orderType=' + orderType);
      });
    } catch (error) {
      console.log(error);
    }
  };

  public DeleteDocumentInstance = (BASEURL: string, headers: AxiosRequestHeaders): AxiosInstance => {
    return axios.create({
      baseURL: BASEURL,
      headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  };
}
