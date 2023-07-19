/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { caseApi } from '../../../app/case/CaseApi';
import { DocumentUploadResponse } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { AnyType, isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../app/form/validation';
import { applyParms } from '../../../steps/common/url-parser';
import { APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../steps/urls';

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { awp_application_form } = (req?.files as Record<string, any>) ?? {};
    const { applicationType, applicationReason } = req.params;

    if (
      req.body.onlyContinue &&
      req.session.userCase.awp_uploadedApplicationForms &&
      req.session.userCase.awp_uploadedApplicationForms.length > 0
    ) {
      super.redirect(req, res);
    } else {
      if (isNull(awp_application_form) || awp_application_form === undefined) {
        this.handleError(req, res, {
          propertyName: 'awpUploadApplicationForm',
          errorType: 'required',
        });
      } else if (!isValidFileFormat({ documents: awp_application_form })) {
        this.handleError(req, res, {
          propertyName: 'awpUploadApplicationForm',
          errorType: 'fileFormat',
        });
      } else if (isFileSizeGreaterThanMaxAllowed({ documents: awp_application_form })) {
        this.handleError(req, res, {
          propertyName: 'awpUploadApplicationForm',
          errorType: 'fileSize',
        });
      } else {
        req.session.errors = [];
        const formData: FormData = new FormData();

        formData.append('file', awp_application_form.data, {
          contentType: awp_application_form.mimetype,
          filename: awp_application_form.name,
        });

        try {
          const userDetails = req?.session?.user;
          const responseBody: DocumentUploadResponse = await caseApi(userDetails, req.locals.logger).uploadDocument(
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
            req.session.userCase.awp_uploadedApplicationForms &&
            req.session.userCase.awp_uploadedApplicationForms.length > 0
          ) {
            req.session.userCase.awp_uploadedApplicationForms.push(documentInfo);
          } else {
            req.session.userCase.awp_uploadedApplicationForms = [documentInfo];
          }

          req.session.save(() => {
            res.redirect(
              applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, { applicationType, applicationReason })
            );
          });
        } catch (error) {
          res.json(error);
        }
      }
    }
  }

  private handleError(
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
      super.redirect(req, res);
    });
  }
}
