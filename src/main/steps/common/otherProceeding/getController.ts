/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { caseApi as C100Api } from '../../../app/case/C100CaseApi';
import { caseApi } from '../../../app/case/CaseApi';
import { FieldPrefix } from '../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  ProceedingsOrderInterface,
  ProceedingsOrderTypeKeyMapper,
  ProceedingsOrderTypes,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_URL,
  OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  RESPONSE_TASKLIST,
} from '../../../steps/urls';
import { Language, generatePageContent } from '../../common/common.content';

@autobind
export default class OtherProceedingsGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async removeDocument(req: AppRequest, res: Response): Promise<void> {
    const { removeId, orderType, orderId } = req.params;
    this.removeExistingDocument(removeId, req, res, orderType, orderId);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }
    const { orderId, orderType, removeId } = req.params;
    const courtOrderType = req.originalUrl.startsWith(C100_URL)
      ? (orderType as C100OrderTypes)
      : (orderType as ProceedingsOrderTypes);
    const courtOrderId: any = orderId;
    if (removeId && orderType) {
      this.removeDocument(req, res);
    } else {
      let currentOrderDocument = {
        id: '',
        url: '',
        filename: '',
        binaryUrl: '',
      };

      currentOrderDocument = this.generateCurrentOrderDocument(req, courtOrderType, courtOrderId, currentOrderDocument);

      const language = super.getPreferredLanguage(req) as Language;

      const content = generatePageContent({
        language,
        pageContent: this.content,
        userCase: req.session?.userCase,
        userEmail: req.session?.user?.email,
        additionalData: {
          req,
        },
      });

      const sessionErrors = req.session?.errors || [];
      if (req.session?.errors) {
        req.session.errors = undefined;
      }
      if (req.originalUrl.startsWith(C100_URL)) {
        super.clearConfidentialitySessionSaveData(req);
      }
      res.render(this.view, {
        ...content,
        sessionErrors,
        htmlLang: language,
        orderType,
        orderId,
        document: currentOrderDocument,
        fileUplaodUrl: applyParms(
          req.originalUrl.startsWith(C100_URL)
            ? C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD
            : OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
          { orderType, orderId }
        ),
        fileRemoveUrl: applyParms(
          req.originalUrl.startsWith(C100_URL)
            ? C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD
            : OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
          {
            orderType,
            orderId,
            removeId: currentOrderDocument.id,
          }
        ),
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
      const userDetails = req?.session?.user;
      req.originalUrl.startsWith(C100_URL)
        ? await C100Api(userDetails, req.locals.logger).deleteDocument(docId)
        : await caseApi(userDetails, req.locals.logger).deleteDocument(docId);

      const courtOrderType: any = orderType;
      const courtOrderId: any = orderId;
      if (
        req.originalUrl.startsWith(C100_URL) &&
        req.session.userCase?.op_otherProceedings?.order?.[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]
      ) {
        req.session.userCase.op_otherProceedings.order[C100OrderTypeKeyMapper[courtOrderType]][
          courtOrderId - 1
        ].orderDocument = undefined;
      } else if (
        req.originalUrl.startsWith(RESPONSE_TASKLIST) &&
        req.session.userCase?.otherProceedings?.order?.[ProceedingsOrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]
      ) {
        req.session.userCase.otherProceedings.order[ProceedingsOrderTypeKeyMapper[courtOrderType]][
          courtOrderId - 1
        ].orderDocument = undefined;
      }

      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(
          applyParms(
            req.originalUrl.startsWith(C100_URL)
              ? C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD
              : OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
            { orderType, orderId }
          )
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  private generateCurrentOrderDocument(
    req: AppRequest,
    courtOrderType: C100OrderTypes | ProceedingsOrderTypes,
    courtOrderId: any,
    currentOrderDocument: { id: string; url: string; filename: string; binaryUrl: string }
  ) {
    const orderSessionData = req.originalUrl.startsWith(C100_URL)
      ? (req.session.userCase?.op_otherProceedings?.order?.[
          C100OrderTypeKeyMapper[courtOrderType]
        ] as C100OrderInterface[])
      : (req.session.userCase?.otherProceedings?.order?.[
          ProceedingsOrderTypeKeyMapper[courtOrderType]
        ] as ProceedingsOrderInterface[]);

    const orderSessionDataById = orderSessionData[courtOrderId - 1];
    if (orderSessionDataById.orderDocument) {
      currentOrderDocument = orderSessionDataById.orderDocument;
    }
    return currentOrderDocument;
  }
}
