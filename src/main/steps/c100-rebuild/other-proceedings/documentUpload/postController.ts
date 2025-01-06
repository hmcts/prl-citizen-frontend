/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';

import { DocumentUploadResponse, caseApi } from '../../../../app/case/C100CaseApi';
import { C100OrderInterface, C100OrderTypeKeyMapper, C100OrderTypes } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { validate } from '../../../../steps/tasklistresponse/proceedings/documentUpload/postController';
import { C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';

const C100OrderTypeNameMapper = {
  childArrangementOrder: 'Child Arrangements Order',
  emergencyProtectionOrder: 'Emergency Protection Order',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
  childAbductionOrder: 'Child Abduction Order',
  contactOrderForDivorce: 'Contact Order For Divorce',
  contactOrderForAdoption: 'Contact Order For Adoption',
  childMaintenanceOrder: 'Child Maintenance Order',
  financialOrder: 'Financial Order',
  nonMolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  forcedMarriageProtectionOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining Order',
  otherInjuctionOrder: 'Other Injuction Order',
  undertakingOrder: 'Undertaking Order',
  otherOrder: 'Other Order',
};

/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  /**
   * A recursive function that calls itself.
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { files }: AppRequest<AnyObject> = req;
    const { orderType, orderId } = req.params;

    const courtOrderId: any = orderId;
    const courtOrder = {
      courtOrderType: orderType as C100OrderTypes,
      courtOrderId,
    };

    const orderSessionData = req.session.userCase?.op_otherProceedings?.order?.[
      C100OrderTypeKeyMapper[courtOrder.courtOrderType]
    ] as C100OrderInterface[];
    const orderSessionDataById = orderSessionData[courtOrderId - 1];

    if (req.body.saveAndComeLater) {
      super.post(req, res);
    } else if (req.body.saveAndContinue && this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
      super.redirect(req, res);
    } else {
      this.ifContinueIsClicked(req, res, orderSessionDataById, files, orderType, orderId, courtOrder);
    }
  }

  private ifContinueIsClicked(req, res, orderSessionDataById, files, orderType, orderId, courtOrder) {
    if (this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
      req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
      req.session.save(err => {
        this.checkErrorsAndRedirect(err, res, orderType, orderId);
      });
    } else {
      this.validateFileAndUpload(
        files,
        req,
        res,
        orderType,
        orderId,
        courtOrder.courtOrderType,
        courtOrder.courtOrderId
      ).catch(err => req.locals.logger.error(err));
    }
  }

  private checkErrorsAndRedirect(err, res, orderType, orderId) {
    if (err) {
      throw err;
    }
    res.redirect(applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async validateFileAndUpload(files, req, res, orderType, orderId, courtOrderType, courtOrderId): Promise<void> {
    if (validate(files, req, res, orderType, orderId, false)) {
      req.session.errors = [];
      const { documents }: any = files;

      const formData: FormData = new FormData();

      const dateOfSystem = new Date().toLocaleString('en-GB').split(',')[0].split('/').join('');
      const extensionType = documents.name.split('.')[documents.name.split('.').length - 1];
      const orderTypeName = this.buildOrderTypeName(courtOrderType);
      let fileName: string | undefined;
      this.checkOrderTypeAndAppendDocument(
        orderId,
        fileName,
        orderTypeName,
        dateOfSystem,
        extensionType,
        formData,
        documents
      );

      try {
        const userDeatils = req?.session?.user;
        const responseBody: DocumentUploadResponse = await caseApi(userDeatils, req.locals.logger).uploadDocument(
          formData
        );
        const { document_url, document_filename, document_binary_url } = responseBody['document'];
        const documentInfo = {
          id: document_url.split('/')[document_url.split('/').length - 1],
          url: document_url,
          filename: document_filename,
          binaryUrl: document_binary_url,
        };

        if (
          req.session.userCase?.op_otherProceedings?.order?.[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]
        ) {
          req.session.userCase.op_otherProceedings.order[C100OrderTypeKeyMapper[courtOrderType]][
            courtOrderId - 1
          ].orderDocument = documentInfo;
        }

        req.session.save(() => {
          res.redirect(applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
        });
      } catch (error) {
        res.json(error);
      }
    }
  }

  private checkOrderTypeAndAppendDocument(
    orderId,
    fileName,
    orderTypeName,
    dateOfSystem,
    extensionType,
    formData,
    documents
  ) {
    if (orderId === '1') {
      fileName = `applicant__${orderTypeName}__${dateOfSystem}.${extensionType}`;
    } else {
      fileName = `applicant__${orderTypeName}_${orderId}__${dateOfSystem}.${extensionType}`;
    }
    formData.append('file', documents.data, {
      contentType: documents.mimetype,
      filename: fileName,
    });
  }

  public checkIfDocumentAlreadyExist = (orderDataById: C100OrderInterface): boolean => {
    if (orderDataById?.orderDocument?.id) {
      return true;
    }
    return false;
  };

  public buildOrderTypeName(courtOrderType: C100OrderTypes): string {
    return C100OrderTypeNameMapper[courtOrderType].split(' ').join('_').toLowerCase();
  }
}
