import https from 'https';

import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { getServiceAuthTokenForPRLCitizen } from '../../../../app/auth/service/get-service-auth-token';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';

// eslint-disable-next-line import/no-unresolved
import { AnyType, FileMimeTypeInfo, FileType, IDocumentUploadResponse, URL_OF_FILE_UPLOAD } from './index';

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

export const DOCUMENT_UPLOAD_URL: URL_OF_FILE_UPLOAD = config.get('documentUpload.url');

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
    console.log('inside postdocumentUploader');
    const { files }: AppRequest<AnyObject> = req;
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
          formData.append('file', documents.data, {
            contentType: documents.mimetype,
            filename: documents.name,
          });
          const formHeaders = formData.getHeaders();
          const Headers = {
            Authorization: `Bearer ${req.session.user['accessToken']}`,
            ServiceAuthorization: 'Bearer ' + (await getServiceAuthTokenForPRLCitizen()),
          };
          try {
            const requestDocument = await this.UploadDocumentInstance(DOCUMENT_UPLOAD_URL, Headers).post(
              '/upload-citizen-statement-document',
              formData,
              {
                headers: {
                  ...formHeaders,
                },
              }
            );
            const responseBody: IDocumentUploadResponse = requestDocument['data'];
            console.log(responseBody);

            res.json({ requestDocument: requestDocument['data'] });
          } catch (error) {
            res.json(error);
          }
        }
      }
    }
  }

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
