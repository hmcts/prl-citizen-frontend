import https from 'https';

import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { getServiceAuthTokenForPRLCitizen } from '../../../../app/auth/service/get-service-auth-token';
import { C100OrderInterface, C100OrderTypeKeyMapper } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD } from '../../../urls';

// eslint-disable-next-line import/no-unresolved
import { AnyType, FileMimeTypeInfo, FileType, IDocumentUploadResponse, URL_OF_FILE_UPLOAD } from './documentConstants';

export const FileMimeType: Partial<Record<keyof FileType, keyof FileMimeTypeInfo>> = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  png: 'image/png',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  jpg: 'image/jpeg',
  txt: 'text/plain',
  rtf: 'application/rtf',
  rtf2: 'text/rtf',
  gif: 'image/gif',
};

export const PRL_COS_URL: URL_OF_FILE_UPLOAD = config.get('services.cos.url');

export class FileValidations {
  /* This is a static method that is checking the file size. */
  static sizeValidation = (fileSize: number): boolean => {
    const KbsInMBS = Number(config.get('documentUpload.validation.sizeInKB'));
    if (fileSize <= KbsInMBS) {
      return true;
    } else {
      return false;
    }
  };

  /* Checking the file type. */
  static formatValidation = (mimeType: string): boolean => {
    const allMimeTypes = Object.values(FileMimeType);
    const checkForFileMimeType = allMimeTypes.filter(aMimeType => aMimeType === mimeType);
    return checkForFileMimeType.length > 0;
  };
}

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
    console.log({ orderType, orderId });
    if (isNull(files)) {
      const errorMessage = 'valdiation error';
      this.uploadFileError(req, res, errorMessage);
    } else {
      const { documents }: AnyType = files;
      const checkIfMultipleFiles: boolean = Array.isArray(documents);
      if (!checkIfMultipleFiles) {
        const validateMimeType: boolean = FileValidations.formatValidation(documents.mimetype);
        const validateFileSize: boolean = FileValidations.sizeValidation(documents.size);
        const formData: FormData = new FormData();
        if (validateMimeType && validateFileSize) {
          const dateOfSystem = new Date().toLocaleString().split(',')[0].split('/').join('');
          const extensionType = documents.name.split('.')[documents.name.split('.').length - 1];
          const fileName = `applicant_emergency_protection_${orderType}_${dateOfSystem}.${extensionType}`;
          formData.append('file', documents.data, {
            contentType: documents.mimetype,
            filename: fileName,
          });
          const courtOrderType: AnyType | undefined = orderType;
          const courtOrderId: AnyType | undefined = orderId;
          const orderSessionData = req.session.userCase?.[
            C100OrderTypeKeyMapper[courtOrderType]
          ] as C100OrderInterface[];
          const orderSessionDataById = orderSessionData[courtOrderId - 1];
          this.checkIfDocumentAlreadyExist(courtOrderType, req, res, orderSessionDataById);
          const formHeaders = formData.getHeaders();
          const Headers = {
            Authorization: `Bearer ${req.session.user['accessToken']}`,
            ServiceAuthorization: 'Bearer ' + (await getServiceAuthTokenForPRLCitizen()),
          };
          try {
            const requestDocument = await this.UploadDocumentInstance(PRL_COS_URL, Headers).post(
              '/upload-citizen-statement-document',
              formData,
              {
                headers: {
                  ...formHeaders,
                },
              }
            );
            console.log(requestDocument);
            const responseBody: IDocumentUploadResponse = requestDocument['data'];
            const { document_url, document_filename, document_binary_url } = responseBody['document'];
            const documentInfo = {
              id: document_url.split('/')[document_url.split('/').length - 1],
              url: document_url,
              filename: document_filename,
              binaryUrl: document_binary_url,
            };
            // const currentSessionDocument: EmergencyCourtDocument[] =
            //   req.session['userCase']['emergencyuploadedDocuments'] || [];
            // req.session.userCase.emergencyuploadedDocuments = [...currentSessionDocument, documentData];

            //orderSessionDataById.orderDocument = documentInfo;

            if (req.session.userCase[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1]) {
              req.session.userCase[C100OrderTypeKeyMapper[courtOrderType]][courtOrderId - 1].orderDocument =
                documentInfo;
            }

            req.session.save(() => {
              const redirectURL =
                C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD + `?orderType=${orderType}` + `?orderId=${orderId}`;
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

  public checkIfDocumentAlreadyExist = async (
    orderType: string,
    req: AppRequest,
    res: Response,
    orderDataById: C100OrderInterface
  ): Promise<void> => {
    if (orderDataById.orderDocument) {
      req.session.errors = [{ propertyName: 'document', errorType: 'required' }];
      res.redirect(C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD + '?orderType=' + orderType);
    }
  };

  /* It's a function that creates an instance of the axios library. */
  public UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
    return axios.create({
      baseURL: BASEURL,
      headers: header,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
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
    errorMessage?: string
  ) {
    /**
     * @Insert @Error @here
     */
    console.log(errorMessage);
    super.redirect(req, res, '');
  }
}
