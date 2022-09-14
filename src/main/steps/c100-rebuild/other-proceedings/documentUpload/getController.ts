import https from 'https';

import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { Response } from 'express';

import { getServiceAuthTokenForPRLCitizen } from '../../../../app/auth/service/get-service-auth-token';
import { FieldPrefix } from '../../../../app/case/case';
import {
  C100DocumentInfo,
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypeNameMapper,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../common/common.content';
import { C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD } from '../../../urls';

import { AnyType } from './documentConstants';
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
    const { removeId, orderType, orderId } = req.query;
    this.removeExistingDocument(removeId as string, req, res, orderType as string, orderId as string);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }
    const { orderType, orderId } = req.query;
    const courtOrderType: AnyType | undefined = orderType;
    const courtOrderId: AnyType | undefined = orderId;
    if (req.query.hasOwnProperty('removeId') && req.query.hasOwnProperty('orderType')) {
      this.removeDocument(req, res);
    } else {
      let currentOrderDocument: C100DocumentInfo | undefined = {
        id: '',
        url: '',
        filename: '',
        binaryUrl: '',
      };

      const orderSessionData = req.session.userCase?.otherProceedings?.order?.[
        C100OrderTypeKeyMapper[courtOrderType]
      ] as C100OrderInterface[];
      const orderTypeName = C100OrderTypeNameMapper[courtOrderType] + ' ';

      const orderSessionDataById = orderSessionData[courtOrderId - 1];
      if (orderSessionDataById.orderDocument) {
        currentOrderDocument = orderSessionDataById.orderDocument;
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
        orderId,
        orderTypeName,
        postURL: C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD,
        document: currentOrderDocument,
      });
    }
  }

  public removeExistingDocument = async (
    docId: string,
    req: AppRequest,
    res: Response,
    orderType: string,
    orderId: string
  ): Promise<void> => {
    try {
      const Headers = {
        Authorization: `Bearer ${req.session.user['accessToken']}`,
        ServiceAuthorization: 'Bearer ' + (await getServiceAuthTokenForPRLCitizen()),
      };
      const deleteDocumentPath = `/${docId}/delete`;
      await this.DeleteDocumentInstance(PRL_COS_URL, Headers).delete(deleteDocumentPath);

      const courtOrderType: AnyType | undefined = orderType;
      const courtOrderId: AnyType | undefined = orderId;

      if (req.session.userCase?.otherProceedings?.order?.[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]) {
        req.session.userCase.otherProceedings.order[C100OrderTypeKeyMapper[courtOrderType]][
          courtOrderId - 1
        ].orderDocument = undefined;
      }

      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD + '?orderType=' + orderType + '&orderId=' + orderId);
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
