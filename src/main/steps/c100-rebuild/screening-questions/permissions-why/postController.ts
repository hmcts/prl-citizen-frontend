/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import _ from 'lodash';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../../app/form/validation';

@autobind
export default class PermissionsWhyUploadController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private hasError(req: AppRequest): string | undefined {
    const fileUploaded = _.get(req, 'files.sq_uploadDocument_subfield');
    if (!fileUploaded) {
      return;
    }

    if (req.session.userCase.sq_uploadDocument_subfield) {
      return 'multipleFiles';
    }

    if (!isValidFileFormat({ documents: fileUploaded })) {
      return 'invalidFileFormat';
    }

    if (isFileSizeGreaterThanMaxAllowed({ documents: fileUploaded })) {
      return 'maxFileSize';
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fileUploaded = _.get(req, 'files.sq_uploadDocument_subfield') as Record<string, any>;

    if (fileUploaded) {
      const error = this.hasError(req);

      if (error) {
        req.session.errors = [
          {
            propertyName: 'sq_uploadDocument_subfield',
            errorType: error,
          },
        ];
        return super.redirect(req, res);
      }

      const formData: FormData = new FormData();

      formData.append('file', fileUploaded.data, {
        contentType: fileUploaded.mimetype,
        filename: fileUploaded.name,
      });

      try {
        const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);

        req.session.userCase = {
          ...req.session.userCase,
          sq_uploadDocument_subfield: response.document,
        };

        req.session.errors = [];
        req.body.sq_uploadDocument_subfield = req.session.userCase?.sq_uploadDocument_subfield;
        req.session.save();
        return super.post(req, res);
      } catch {
        req.session.errors = [
          {
            propertyName: 'sq_uploadDocument_subfield',
            errorType: 'uploadError',
          },
        ];
        return super.redirect(req, res);
      }
    }
    return super.post(req, res);
  }
}
