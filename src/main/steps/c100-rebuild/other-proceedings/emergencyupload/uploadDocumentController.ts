import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { FormFieldsFn, FormFields } from '../../../../app/form/Form';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import {getServiceAuthToken} from'../../../../app/auth/service/get-service-auth-token';
import { C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD } from '../../../urls';

type URL_OF_FILE = string;
type AnyType = any;

/**
 * ****** File Extensions Types are being check
 */
type FileType = {
  doc: string;
  docx: string;
  pdf: string;
  png: string;
  xls: string;
  xlsx: string;
  jpg: string;
  txt: string;
  rtf: string;
  rtf2: string;
  gif: string;
};

/**
 * ****** File MimeTypes are being check
 */
type FileMimeTypeInfo = {
  'application/msword': string;
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': string;
  'application/pdf': string;
  'image/png': string;
  'application/vnd.ms-excel': string;
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': string;
  'image/jpeg': string;
  'text/plain': string;
  'application/rtf': string;
  'text/rtf': string;
  'image/gif': string;
};

/**
 * ****** File Upload validations Message
 */
// type FileUploadErrorTranslatables = {
//   FORMAT_ERROR?: string;
//   SIZE_ERROR?: string;
//   TOTAL_FILES_EXCEED_ERROR?: string;
//   CONTINUE_WITHOUT_UPLOAD_ERROR?: string;
//   NO_FILE_UPLOAD_ERROR?: string;
// };

export const PRL_COS_API_URL: URL_OF_FILE = config.get('services.cos.url');

/* It's a type that is being used to check the file type. */
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
    console.log("inside postdocumentUploader");
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
          /**
           * @RequestHeaders
           */
          const Headers = {
            Authorization: `Bearer ${req.session.user['accessToken']}`,
            ServiceAuthorization: 'Bearer' + getServiceAuthToken(),
          };
          try {
            const RequestDocument = await this.UploadDocumentInstance(PRL_COS_API_URL, Headers).post(
              `/generate-citizen-statement-document`,
              formData,
              {
                headers: {
                  ...formHeaders,
                },
              }
            );

            const uploadedDocument = RequestDocument.data.document;
            req.session['caseDocuments'].push(uploadedDocument);
            req.session['errors'] = undefined;
            this.redirect(req, res, C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD);
          } catch (error) {
            Logger.error(error);
          }
        }
      }
    }
    res.json({ msg: 'welcome' });
  }

  /* It's a function that creates an instance of the axios library. */
  public UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
    return axios.create({
      baseURL: BASEURL,
      headers: header,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
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