import autobind from 'autobind-decorator';
import { Response } from 'express';

import { caseApi } from '../../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../../app/case/case';
import {
  C100DocumentInfo,
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import { Language, generatePageContent } from '../../../common/common.content';
import { C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';
export type URL_OF_FILE_UPLOAD = string;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

@autobind
export default class DocumentUpload extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async removeDocument(req: AppRequest, res: Response): Promise<void> {
    const { removeId, orderType, orderId } = req.params;
    this.removeExistingDocument(removeId as string, req, res, orderType as string, orderId as string);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }
    const { orderId, orderType, removeId } = req.params;
    const courtOrderType = orderType as C100OrderTypes;
    const courtOrderId: AnyType | undefined = orderId;
    if (removeId && orderType) {
      this.removeDocument(req, res);
    } else {
      let currentOrderDocument: C100DocumentInfo | undefined = {
        id: '',
        url: '',
        filename: '',
        binaryUrl: '',
      };

      const orderSessionData = req.session.userCase?.op_otherProceedings?.order?.[
        C100OrderTypeKeyMapper[courtOrderType]
      ] as C100OrderInterface[];
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
        document: currentOrderDocument,
        fileUplaodUrl: applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }),
        fileRemoveUrl: applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, {
          orderType,
          orderId,
          removeId: currentOrderDocument.id,
        }),
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
      await caseApi(userDetails, req.locals.logger).deleteDocument(docId);

      const courtOrderType: AnyType | undefined = orderType;
      const courtOrderId: AnyType | undefined = orderId;

      if (
        req.session.userCase?.op_otherProceedings?.order?.[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]
      ) {
        req.session.userCase.op_otherProceedings.order[C100OrderTypeKeyMapper[courtOrderType]][
          courtOrderId - 1
        ].orderDocument = undefined;
      }

      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
      });
    } catch (error) {
      req.locals.logger.error(error);
    }
  };
}
