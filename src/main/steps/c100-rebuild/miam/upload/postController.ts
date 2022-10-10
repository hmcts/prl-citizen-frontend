import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { DocumentUploadResponse } from '../../../../app/case/C100CaseApi';
import { C100DocumentInfo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../../app/form/validation';
import { C100_MIAM_UPLOAD } from '../../../urls';

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
    const miamCertificate = req.session.userCase?.miam_certificate as C100DocumentInfo;

    if (this.checkIfDocumentAlreadyExist(miamCertificate)) {
      req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(`${C100_MIAM_UPLOAD}`);
      });
    } else {
      if (isNull(files) || files === undefined) {
        this.uploadFileError(req, res, {
          propertyName: 'document',
          errorType: 'required',
        });
      } else if (!isValidFileFormat(files)) {
        this.uploadFileError(req, res, {
          propertyName: 'document',
          errorType: 'fileFormat',
        });
      } else if (isFileSizeGreaterThanMaxAllowed(files)) {
        this.uploadFileError(req, res, {
          propertyName: 'document',
          errorType: 'fileSize',
        });
      } else {
        const { documents }: AnyType = files;

        const formData: FormData = new FormData();

        const dateOfSystem = new Date().toLocaleString('en-GB').split(',')[0].split('/').join('');
        const extensionType = documents.name.split('.')[documents.name.split('.').length - 1];

        formData.append('file', documents.data, {
          contentType: documents.mimetype,
          filename: `applicant__miam_certificate__${dateOfSystem}.${extensionType}`,
        });
        try {
          const responseBody: DocumentUploadResponse = await req.locals.C100Api.uploadDocument(formData);
          const { document_url, document_filename, document_binary_url } = responseBody['document'];
          req.session.userCase['miam_certificate'] = {
            id: document_url.split('/')[document_url.split('/').length - 1],
            url: document_url,
            filename: document_filename,
            binaryUrl: document_binary_url,
          };

          req.session.save(() => {
            const redirectURL = `${C100_MIAM_UPLOAD}`;
            res.redirect(redirectURL);
          });
        } catch (error) {
          console.log(error);
          res.json(error);
        }
      }
    }
  }

  public checkIfDocumentAlreadyExist = (document: C100DocumentInfo): boolean => {
    if (document?.id) {
      return true;
    }
    return false;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errObj: any
  ) {
    req.session.errors = [errObj];
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(`${C100_MIAM_UPLOAD}`);
    });
  }
}
