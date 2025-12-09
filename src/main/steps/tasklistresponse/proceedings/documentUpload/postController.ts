import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';
import type { LoggerInstance } from 'winston';

import { caseApi } from '../../../../app/case/CaseApi';
import {
  DocumentUploadResponse,
  ProceedingsOrderInterface,
  ProceedingsOrderTypeKeyMapper,
  ProceedingsOrderTypes,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../../app/form/validation';
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';

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

//eslint-disable-next-line @typescript-eslint/no-explicit-any

/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, private readonly logger: LoggerInstance) {
    super(fields);
  }

  /**
   * A recursive function that calls itself.
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  public async post(requ: AppRequest, res: Response): Promise<void> {
    const { files }: AppRequest = requ;
    const { orderType, orderId } = requ.params;
    const req: AppRequest<AnyObject> = requ;
    const courtOrderType = orderType as ProceedingsOrderTypes;
    const courtOrderId: string | undefined = orderId;

    const orderSessionData = req.session.userCase?.otherProceedings?.order?.[
      ProceedingsOrderTypeKeyMapper[courtOrderType]
    ] as ProceedingsOrderInterface[];
    const orderSessionDataById = orderSessionData[(courtOrderId as unknown as number) - 1];

    if (req.body.onlyContinue && this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
      return super.redirect(req, res);
    }

    if (this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
      this.logger.info('UploadDocumentController - Multiple file upload attempt detected.');
      req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
      req.session.save(err => {
        if (err) {
          this.logger.error('UploadDocumentController - Error while saving the session.', err);
          throw err;
        }
        res.redirect(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
      });
    } else {
      this.logger.info('UploadDocumentController - Processing new document upload.');
      await this.processNewDocument(files, req, res, orderType, orderId, courtOrderType, courtOrderId);
    }
  }

  public checkIfDocumentAlreadyExist = (orderDataById: ProceedingsOrderInterface): boolean => {
    if (orderDataById?.orderDocument?.id) {
      this.logger.info(
        'UploadDocumentController - Document already exists for this order. Order id: ' + orderDataById.id
      );
      return true;
    }
    this.logger.info(
      'UploadDocumentController - No existing document found for this order. Order id: ' + orderDataById.id
    );
    return false;
  };
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  async processNewDocument(
    files: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined,
    req: AppRequest,
    res: Response,
    orderType: string,
    orderId: string,
    courtOrderType: ProceedingsOrderTypes,
    courtOrderId: string
  ): Promise<void> {
    if (validate(files, req, res, orderType, orderId, true)) {
      this.logger.info('UploadDocumentController - Validating uploaded document. Order id: ' + orderId);
      const { documents }: any = files;

      const formData: FormData = new FormData();

      const dateOfSystem = new Date().toLocaleString('en-GB').split(',')[0].split('/').join('');
      const extensionType = documents.name.split('.')[documents.name.split('.').length - 1];
      const orderTypeName = this.buildOrderTypeName(courtOrderType);
      let fileName: string;
      if (orderId === '1') {
        fileName = `applicant__${orderTypeName}__${dateOfSystem}.${extensionType}`;
      } else {
        fileName = `applicant__${orderTypeName}_${orderId}__${dateOfSystem}.${extensionType}`;
      }
      formData.append('file', documents.data, {
        contentType: documents.mimetype,
        filename: fileName,
      });
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
          req.session.userCase?.otherProceedings?.order?.[ProceedingsOrderTypeKeyMapper[courtOrderType]][
            (courtOrderId as unknown as number) - 1
          ]
        ) {
          this.logger.info('UploadDocumentController - Saving uploaded document info to session. Order id: ' + orderId);
          req.session.userCase.otherProceedings.order[ProceedingsOrderTypeKeyMapper[courtOrderType]][
            (courtOrderId as unknown as number) - 1
          ].orderDocument = documentInfo;
        } else {
          this.logger.error(
            'UploadDocumentController - Order data not found in session. Cannot save document info. Order id: ' +
              orderId
          );
        }
        this.logger.info('UploadDocumentController - Document upload successful. Order id: ' + orderId);
        req.session.save(() => {
          res.redirect(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
        });
      } catch (error) {
        this.logger.error('UploadDocumentController - Document upload failed. Order id: ' + orderId, error);
        res.json(error);
      }
    } else {
      this.logger.error('UploadDocumentController - Document validation failed. Order id: ' + orderId);
    }
  }

  public buildOrderTypeName(courtOrderType: ProceedingsOrderTypes): string {
    return C100OrderTypeNameMapper[courtOrderType].split(' ').join('_').toLowerCase();
  }
}
export const validate = (
  files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined,
  req: AppRequest<AnyObject>,
  res: Response<any, Record<string, any>>,
  orderType: string,
  orderId: string,
  isResponseJourney: boolean
): boolean | void => {
  if (isNull(files) || files === undefined) {
    return uploadFileError(
      req,
      res,
      orderType,
      orderId,
      {
        propertyName: 'document',
        errorType: 'required',
      },
      isResponseJourney
    );
  } else if (!isValidFileFormat(files)) {
    return uploadFileError(
      req,
      res,
      orderType,
      orderId,
      {
        propertyName: 'document',
        errorType: 'fileFormat',
      },
      isResponseJourney
    );
  } else if (isFileSizeGreaterThanMaxAllowed(files)) {
    return uploadFileError(
      req,
      res,
      orderType,
      orderId,
      {
        propertyName: 'document',
        errorType: 'fileSize',
      },
      isResponseJourney
    );
  } else {
    return true;
  }
};
/**
 * It's a function that handles errors that occur during the upload process
 * @param req - AppRequest<AnyObject>
 * @param res - Response<AnyType, Record<string, AnyType>>
 * @param {string} [errorMessage] - The error message to be displayed.
 */
const uploadFileError = (
  req: AppRequest<AnyObject>,
  res: Response,
  orderType: string,
  orderId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errObj: any,
  isResponseJourney: boolean
) => {
  /**
   * @Insert @Error @here
   */
  req.session.errors = [errObj];
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.redirect(
      isResponseJourney
        ? applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId })
        : applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId })
    );
  });
};
