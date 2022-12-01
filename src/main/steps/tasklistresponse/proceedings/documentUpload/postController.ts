import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

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
import { OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';

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

// eslint-disable-next-line import/no-unresolved
import { AnyType } from './getController';

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
  public async post(requ: AppRequest, res: Response): Promise<void> {
    const { files }: AppRequest = requ;
    const { orderType, orderId } = requ.params;
    const req: AppRequest<AnyObject> = requ;
    const courtOrderType = orderType as ProceedingsOrderTypes;
    const courtOrderId: AnyType | undefined = orderId;

    const orderSessionData = req.session.userCase?.otherProceedings?.order?.[
      ProceedingsOrderTypeKeyMapper[courtOrderType]
    ] as ProceedingsOrderInterface[];
    const orderSessionDataById = orderSessionData[courtOrderId - 1];

    if (req.body.saveAndComeLater) {
      super.post(req, res);
    } else if (req.body.onlyContinue && this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
      super.redirect(req, res, '');
    } else {
      if (this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
        req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.redirect(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
        });
      } else {
        if (isNull(files) || files === undefined) {
          this.uploadFileError(req, res, orderType as string, orderId as string, {
            propertyName: 'document',
            errorType: 'required',
          });
        } else if (!isValidFileFormat(files)) {
          this.uploadFileError(req, res, orderType as string, orderId as string, {
            propertyName: 'document',
            errorType: 'fileFormat',
          });
        } else if (isFileSizeGreaterThanMaxAllowed(files)) {
          this.uploadFileError(req, res, orderType as string, orderId as string, {
            propertyName: 'document',
            errorType: 'fileSize',
          });
        } else {
          const { documents }: AnyType = files;

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
                courtOrderId - 1
              ]
            ) {
              req.session.userCase.otherProceedings.order[ProceedingsOrderTypeKeyMapper[courtOrderType]][
                courtOrderId - 1
              ].orderDocument = documentInfo;
            }

            req.session.save(() => {
              res.redirect(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
            });
          } catch (error) {
            res.json(error);
          }
        }
      }
    }
  }

  public checkIfDocumentAlreadyExist = (orderDataById: ProceedingsOrderInterface): boolean => {
    if (orderDataById?.orderDocument?.id) {
      return true;
    }
    return false;
  };

  public buildOrderTypeName(courtOrderType: ProceedingsOrderTypes): string {
    return C100OrderTypeNameMapper[courtOrderType].split(' ').join('_').toLowerCase();
  }

  /**
   * It's a function that handles errors that occur during the upload process
   * @param req - AppRequest<AnyObject>
   * @param res - Response<AnyType, Record<string, AnyType>>
   * @param {string} [errorMessage] - The error message to be displayed.
   */

  private uploadFileError(
    req: AppRequest<AnyObject>,
    res: Response<AnyType, Record<string, AnyType>>,
    orderType: string,
    orderId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errObj: any
  ) {
    /**
     * @Insert @Error @here
     */
    req.session.errors = [errObj];
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType, orderId }));
    });
  }
}
