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
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_SCREENING_QUESTIONS_PERMISSIONS_WHY } from '../../../../steps/urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../miam/util';

@autobind
export default class PermissionsWhyUploadController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private hasError(req: AppRequest): string | undefined {
    let errorType;
    const documentUploaded = _.get(req, 'files.sq_uploadDocument');

    if (req.session.userCase.sq_uploadDocument) {
      errorType = 'multipleFiles';
    } else if (!documentUploaded) {
      return;
    } else if (!isValidFileFormat({ documents: documentUploaded })) {
      errorType = 'invalidFileFormat';
    } else if (isFileSizeGreaterThanMaxAllowed({ documents: documentUploaded })) {
      errorType = 'maxFileSize';
    }

    return errorType;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { uploadFile, onlyContinue } = req.body;
    const uploadedDocument = _.get(req, 'session.userCase.sq_uploadDocument');

    if (onlyContinue && uploadedDocument) {
      removeEvidenceDocErrors(req, 'sq_uploadDocument');

      return super.redirect(req, res);
    }

    const error = this.hasError(req);

    if (error) {
      handleEvidenceDocError(error, req, 'sq_uploadDocument');
      return super.redirect(req, res);
    }

    const fileUploaded = _.get(req, 'files.sq_uploadDocument') as unknown as Record<string, any>;
    const formData: FormData = new FormData();

    formData.append('file', fileUploaded.data, {
      contentType: fileUploaded.mimetype,
      filename: fileUploaded.name,
    });

    try {
      const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);
      if (response.status !== 'Success') {
        handleEvidenceDocError('uploadError', req, 'sq_uploadDocument');
        return super.redirect(req, res);
      }

      req.session.userCase = {
        ...req.session.userCase,
        sq_uploadDocument: response.document,
      };
      removeEvidenceDocErrors(req, 'sq_uploadDocument');
      super.redirect(req, res, uploadFile ? applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY) : undefined);
    } catch (e) {
      handleEvidenceDocError('uploadError', req, 'sq_uploadDocument');
      super.redirect(req, res);
    }
  }
}
