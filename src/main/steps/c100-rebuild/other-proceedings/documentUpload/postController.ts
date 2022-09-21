import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { DocumentUploadResponse, caseApi } from '../../../../app/case/C100CaseApi';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypeNameMapper,
  C100OrderTypes,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';

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
    const { orderType, orderId } = req.query;

    const courtOrderType = orderType as C100OrderTypes;
    const courtOrderId: AnyType | undefined = orderId;

    const orderSessionData = req.session.userCase?.otherProceedings?.order?.[
      C100OrderTypeKeyMapper[courtOrderType]
    ] as C100OrderInterface[];
    const orderSessionDataById = orderSessionData[courtOrderId - 1];

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
        this.uploadFileError(req, res, orderType as string, orderId as string);
      } else {
        const { documents }: AnyType = files;

        const formData: FormData = new FormData();

        const dateOfSystem = new Date().toLocaleString().split(',')[0].split('/').join('');
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
            req.session.userCase?.otherProceedings?.order?.[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]
          ) {
            req.session.userCase.otherProceedings.order[C100OrderTypeKeyMapper[courtOrderType]][
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

  public checkIfDocumentAlreadyExist = (orderDataById: C100OrderInterface): boolean => {
    if (orderDataById?.orderDocument?.id) {
      return true;
    }
    return false;
  };

  private buildOrderTypeName(courtOrderType: C100OrderTypes) {
    if (courtOrderType === C100OrderTypes.CONTACT_ORDER_FOR_ADOPTION) {
      return 'contact_order_for_adoption';
    } else if (courtOrderType === C100OrderTypes.CONTACT_ORDER_FOR_DIVORCE) {
      return 'contact_order_for_divorce';
    } else {
      return C100OrderTypeNameMapper[courtOrderType].split(' ').join('_').toLowerCase();
    }
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
    orderId: string
  ) {
    /**
     * @Insert @Error @here
     */
    req.session.errors = [{ propertyName: 'document', errorType: 'required' }];
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(`${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=${orderType}&orderId=${orderId}`);
    });
  }
}
