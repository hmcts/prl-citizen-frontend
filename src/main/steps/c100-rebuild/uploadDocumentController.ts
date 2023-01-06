/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { DocumentUploadResponse } from '../../app/case/C100CaseApi';
import { C100DocumentInfo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../app/form/Form';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../app/form/validation';
import { C100_CONSENT_ORDER_UPLOAD, C100_MIAM_UPLOAD } from '../urls';

/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
@autobind
export default class UploadDocumentController {
  private parent;
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }
  /**
   * A recursive function that calls itself.
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - This is the response object txhat will be sent back to the client.
   */

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { files }: AppRequest<AnyObject> = req;
    req.session.errors = [];
    let paramCert = '';
    let fileNamePrefix = '';

    if (req.url.includes(C100_MIAM_UPLOAD)) {
      paramCert = 'miam_certificate';
      fileNamePrefix = 'applicant__miam_certificate__';
    } else if (req.url.includes(C100_CONSENT_ORDER_UPLOAD)) {
      paramCert = 'co_certificate';
      fileNamePrefix = 'applicant__consent_order_draft__';
    }

    const certificate = req.session.userCase?.[paramCert] as C100DocumentInfo;

    if (req.body.saveAndComeLater) {
      this.parent.post(req, res);
    } else if (this.checkSaveandContinueDocumentExist(req, certificate)) {
      this.parent.redirect(req, res, '');
    } else {
      this.checkFileCondition(certificate, req, res, req.originalUrl, files, fileNamePrefix, paramCert);
    }
  }

  /**
   *
   * @param req
   * @param certificate
   * @returns
   */
  public checkSaveandContinueDocumentExist = (req: AppRequest<AnyObject>, certificate: C100DocumentInfo): any => {
    return req.body.saveAndContinue && this.checkIfDocumentAlreadyExist(certificate);
  };

  /**
   *
   * @param document
   * @returns
   */
  public checkIfDocumentAlreadyExist = (document: C100DocumentInfo): boolean => {
    if (document?.id) {
      return true;
    }
    return false;
  };

  /**
   *
   * @param certificate
   * @param req
   * @param res
   * @param redirectUrl
   * @param files
   * @param fileNamePrefix
   * @param paramCert
   */
  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public checkFileCondition(
    certificate: C100DocumentInfo,
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string,
    //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    files: any,
    fileNamePrefix: string,
    paramCert: string
  ) {
    if (this.checkIfDocumentAlreadyExist(certificate)) {
      req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(redirectUrl);
      });
    } else {
      this.checkFileValidation(files, req, res, redirectUrl, fileNamePrefix, paramCert);
    }
  }

  /**
   *
   * @param files
   * @param req
   * @param res
   * @param redirectUrl
   * @param fileNamePrefix
   * @param paramCert
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async checkFileValidation(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    files: any,
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string,
    fileNamePrefix: string,
    paramCert: string
  ) {
    if (this.fileNullCheck(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'document',
        errorType: 'required',
      });
    } else if (!isValidFileFormat(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'document',
        errorType: 'fileFormat',
      });
    } else if (isFileSizeGreaterThanMaxAllowed(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'document',
        errorType: 'fileSize',
      });
    } else {
      const { documents }: any = files;

      const formData: FormData = new FormData();

      const dateOfSystem = new Date().toLocaleString('en-GB').split(',')[0].split('/').join('');
      const extensionType = documents.name.split('.')[documents.name.split('.').length - 1];

      formData.append('file', documents.data, {
        contentType: documents.mimetype,
        filename: `${fileNamePrefix}${dateOfSystem}.${extensionType}`,
      });
      try {
        const responseBody: DocumentUploadResponse = await req.locals.C100Api.uploadDocument(formData);
        const { document_url, document_filename, document_binary_url } = responseBody['document'];
        req.session.userCase[paramCert] = {
          id: document_url.split('/')[document_url.split('/').length - 1],
          url: document_url,
          filename: document_filename,
          binaryUrl: document_binary_url,
        };

        req.session.save(() => {
          res.redirect(redirectUrl);
        });
      } catch (error) {
        res.json(error);
      }
    }
    /**
     * It's a function that handles errors that occur during the upload process
     * @param req - AppRequest<AnyObject>
     * @param res - Response<any, Record<string, any>>
     * @param {string} [errorMessage] - The error message to be displayed.
     */
  }

  /**
   *
   * @param files
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public fileNullCheck = (files: any): boolean => {
    return !!(isNull(files) || files === undefined);
  };

  private uploadFileError(
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string,
    errObj: any
  ) {
    req.session.errors = [errObj];
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(redirectUrl);
    });
  }
}
