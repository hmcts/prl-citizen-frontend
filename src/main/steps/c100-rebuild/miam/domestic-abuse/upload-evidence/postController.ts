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
      errorType = 'wrongFileExtension';
    } else if (isFileSizeGreaterThanMaxAllowed({ documents: uploadedDocument })) {
      errorType = 'fileTooLarge';
    } else if (this.isFileNameTooLong(uploadedDocument)) {
      errorType = 'filenameTooLong';
    }

    return errorType;
  }

  private isFileNameTooLong(file: Record<string, any>): boolean {
    return file.name?.length > 250;
  }

  private isXhr(req: AppRequest<AnyObject>): boolean {
    const accept = req.headers?.['accept'];
    return req.headers?.['sec-fetch-dest'] === 'empty' || (!!accept && !accept.includes('text/html'));
  }

  private async deleteDocument(req: AppRequest<AnyObject>, res: Response, documentId: string): Promise<void> {
    const docs = req.session.userCase.miam_domesticAbuseEvidenceDocs ?? [];

    try {
      await caseApi(req.session.user, req.locals.logger).deleteDocument(documentId);
      req.session.userCase.miam_domesticAbuseEvidenceDocs = docs.filter(
        doc => doc.document_url.substring(doc.document_url.lastIndexOf('/') + 1) !== documentId
      );
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
      this.respondJson(req, res, {}, applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
    } catch (e) {
      this.respondJson(req, res, { error: { message: 'deleteError' } }, applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { uploadFile, onlyContinue, delete: deleteDocumentId } = req.body;

    if (deleteDocumentId) {
      return this.deleteDocument(req, res, String(deleteDocumentId));
    }

    if (onlyContinue) {
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');

      return super.redirect(req, res);
    }

    const wantsJson = this.isXhr(req);
    const uploadUrl = applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE);
    const fail = (errorType: string): void => {
      if (wantsJson) {
        return this.respondJson(req, res, { error: { message: errorType } }, uploadUrl);
      }
      handleEvidenceDocError(errorType, req, 'miam_domesticAbuseEvidenceDocs');
      super.redirect(req, res);
    };

    // The multi-file upload component posts the file as "documents"
    const fileUploaded = (_.get(req, 'files.miam_domesticAbuseEvidenceDocs') ??
      _.get(req, 'files.documents')) as unknown as Record<string, any>;
    if (!fileUploaded) {
      return wantsJson ? fail('uploadError') : super.redirect(req, res, C100_MIAM_UPLOAD_DA_EVIDENCE);
    }

    const error = this.hasError(fileUploaded, req);

    if (error) {
      return fail(error);
    }

    const formData: FormData = new FormData();

    formData.append('file', fileUploaded.data, {
      contentType: fileUploaded.mimetype,
      filename: fileUploaded.name,
    });

    try {
      const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);

      if (response.status !== 'Success') {
        return fail('uploadError');
      }

      req.session.userCase.miam_domesticAbuseEvidenceDocs = req.session.userCase.miam_domesticAbuseEvidenceDocs
        ? req.session.userCase.miam_domesticAbuseEvidenceDocs
        : [];

      req.session.userCase.miam_domesticAbuseEvidenceDocs?.push(response.document);
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');

      if (wantsJson) {
        return this.respondJson(
          req,
          res,
          {
            success: response.success,
            file: {
              filename: response.document.document_url.split('/').pop(),
              originalname: response.document.document_filename,
            },
          },
          uploadUrl
        );
      }
      super.redirect(req, res, uploadFile ? uploadUrl : undefined);
    } catch (e) {
      fail('uploadError');
    }
  }
}
