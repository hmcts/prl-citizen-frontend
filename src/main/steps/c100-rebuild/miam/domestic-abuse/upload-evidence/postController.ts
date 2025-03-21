/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import _ from 'lodash';

import { caseApi } from '../../../../../app/case/CaseApi';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import {
  isExceedingMaxDocuments,
  isFileSizeGreaterThanMaxAllowed,
  isValidFileFormat,
} from '../../../../../app/form/validation';
import { applyParms } from '../../../../common/url-parser';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../util';

@autobind
export default class MIAMDomesticAbuseEvidenceUploadController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private hasError(uploadedDocument: Record<string, any>, req: AppRequest<AnyObject>): string | undefined {
    let errorType;

    if (isExceedingMaxDocuments(req.session.userCase.miam_domesticAbuseEvidenceDocs?.length ?? 0)) {
      errorType = 'maxDocumentsReached';
    } else if (!isValidFileFormat({ documents: uploadedDocument })) {
      errorType = 'invalidFileFormat';
    } else if (isFileSizeGreaterThanMaxAllowed({ documents: uploadedDocument })) {
      errorType = 'maxFileSize';
    }

    return errorType;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { uploadFile, onlyContinue } = req.body;

    if (onlyContinue) {
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');

      return super.redirect(req, res);
    }

    const fileUploaded = _.get(req, 'files.miam_domesticAbuseEvidenceDocs') as unknown as Record<string, any>;
    if (!fileUploaded) {
      return super.redirect(req, res, C100_MIAM_UPLOAD_DA_EVIDENCE);
    }

    const error = this.hasError(fileUploaded, req);

    if (error) {
      handleEvidenceDocError(error, req, 'miam_domesticAbuseEvidenceDocs');
      return super.redirect(req, res);
    }

    const formData: FormData = new FormData();

    formData.append('file', fileUploaded.data, {
      contentType: fileUploaded.mimetype,
      filename: fileUploaded.name,
    });

    try {
      const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);

      if (response.status !== 'Success') {
        handleEvidenceDocError('uploadError', req, 'miam_domesticAbuseEvidenceDocs');
        return super.redirect(req, res);
      }

      req.session.userCase.miam_domesticAbuseEvidenceDocs = req.session.userCase.miam_domesticAbuseEvidenceDocs
        ? req.session.userCase.miam_domesticAbuseEvidenceDocs
        : [];

      req.session.userCase.miam_domesticAbuseEvidenceDocs?.push(response.document);
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
      super.redirect(req, res, uploadFile ? applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE) : undefined);
    } catch (e) {
      handleEvidenceDocError('uploadError', req, 'miam_domesticAbuseEvidenceDocs');
      super.redirect(req, res);
    }
  }
}
