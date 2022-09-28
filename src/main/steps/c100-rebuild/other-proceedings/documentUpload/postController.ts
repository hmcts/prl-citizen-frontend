import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { DocumentUploadResponse, caseApi } from '../../../../app/case/C100CaseApi';
import {
  AllowedFileExtentionList,
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';

const C100OrderTypeNameMapper = {
  childArrangementOrder: 'Child Arrangement Order',
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
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { files }: AppRequest<AnyObject> = req;
    const { documents }: AnyType = files;
    const { orderType, orderId } = req.query;

    const courtOrderType = orderType as C100OrderTypes;
    const courtOrderId: AnyType | undefined = orderId;

    const orderSessionData = req.session.userCase?.op_otherProceedings?.order?.[
      C100OrderTypeKeyMapper[courtOrderType]
    ] as C100OrderInterface[];
    const orderSessionDataById = orderSessionData[courtOrderId - 1];

    if (req.body.saveAndContinue && this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
      super.redirect(req, res, '');
    } else {
      if (this.checkIfDocumentAlreadyExist(orderSessionDataById)) {
        req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.redirect(`${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=${orderType}&orderId=${orderId}`);
        });
      } else {
        if (isNull(files) || files === undefined) {
          this.uploadFileError(req, res, orderType as string, orderId as string, {
            propertyName: 'document',
            errorType: 'required',
          });
        } else if (!this.isValidFileFormat(documents)) {
          this.uploadFileError(req, res, orderType as string, orderId as string, {
            propertyName: 'document',
            errorType: 'fileFormat',
          });
        } else if (this.isFileSizeMoreThan20MB(documents)) {
          this.uploadFileError(req, res, orderType as string, orderId as string, {
            propertyName: 'document',
            errorType: 'fileSize',
          });
        } else {
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
              req.session.userCase?.op_otherProceedings?.order?.[C100OrderTypeKeyMapper[courtOrderType]][
                courtOrderId - 1
              ]
            ) {
              req.session.userCase.op_otherProceedings.order[C100OrderTypeKeyMapper[courtOrderType]][
                courtOrderId - 1
              ].orderDocument = documentInfo;
            }

            req.session.save(() => {
              const redirectURL = `${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=${orderType}&orderId=${orderId}`;
              res.redirect(redirectURL);
            });
          } catch (error) {
            console.log(error);
            res.json(error);
          }
        }
      }
    }
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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public isValidFileFormat = (documents: any): boolean => {
    const extension = documents.name.split('.')[documents.name.split('.').length - 1];
    return AllowedFileExtentionList.indexOf(extension) > -1;
  };
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public isFileSizeMoreThan20MB = (documents: any): boolean => {
    return documents.size / 1024 ** 2 > 20;
  };
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
      res.redirect(`${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=${orderType}&orderId=${orderId}`);
    });
  }
}
