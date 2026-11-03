/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import _ from 'lodash';

import { caseApi } from '../../../../../app/case/CaseApi';
import { FILE_UPLOAD_COMMON } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import {
  isExceedingMaxDocuments,
  isFileSizeGreaterThanMaxAllowed,
  isValidFileFormat,
} from '../../../../../app/form/validation';
import { isXhr, runSynchronous } from '../../../../common/documents/upload/utils';
import { applyParms } from '../../../../common/url-parser';
import { documentBelongsToCase } from '../../../../common/utils';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../util';

@autobind
export default class MIAMDomesticAbuseEvidenceUploadController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private readonly uploadUrl = applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE);

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
    return file.name?.length > FILE_UPLOAD_COMMON.maxFilenameLength;
  }

  private async deleteDocument(req: AppRequest<AnyObject>, res: Response, documentId: string): Promise<void> {
    const docs = req.session.userCase.miam_domesticAbuseEvidenceDocs ?? [];

    if (!documentBelongsToCase(documentId, docs)) {
      if (isXhr(req)) {
        return this.respondJson(req, res, { error: { message: 'deleteError' } }, this.uploadUrl);
      }
      handleEvidenceDocError('deleteError', req, 'miam_domesticAbuseEvidenceDocs');
      return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
    }

    try {
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
      await caseApi(req.session.user, req.locals.logger).deleteDocument(documentId);
      req.session.userCase.miam_domesticAbuseEvidenceDocs = docs.filter(
        doc => doc.document_url.substring(doc.document_url.lastIndexOf('/') + 1) !== documentId
      );
      req.locals.logger.info(
        `miam DA doc ${documentId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
      );
      if (isXhr(req)) {
        return this.respondJson(req, res, {}, this.uploadUrl);
      }
      return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
    } catch (e) {
      req.locals.logger.error(`Error deleting document with id ${documentId}: ${e.message}`);
      if (!isXhr(req)) {
        handleEvidenceDocError('deleteError', req, 'miam_domesticAbuseEvidenceDocs');
        return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
      }
      this.respondJson(req, res, { error: { message: 'deleteError' } }, this.uploadUrl);
      return;
    }
  }

  private async uploadDocument(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { uploadFile } = req.body;
    const wantsJson = isXhr(req);
    const uploadUrl = applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE);
    const fail = (errorType: string): void => {
      if (wantsJson) {
        return this.respondJson(req, res, { error: { message: errorType } }, uploadUrl);
      }
      handleEvidenceDocError(errorType, req, 'miam_domesticAbuseEvidenceDocs');
      super.redirect(req, res);
    };

    const filesUploaded = ([] as Record<string, any>[]).concat(
      _.get(req, 'files.miam_domesticAbuseEvidenceDocs') ?? _.get(req, 'files.documents') ?? []
    );
    if (!filesUploaded.length) {
      return wantsJson ? fail('uploadError') : super.redirect(req, res, C100_MIAM_UPLOAD_DA_EVIDENCE);
    }

    try {
      let lastResponse;

      for (const fileUploaded of filesUploaded) {
        const error = this.hasError(fileUploaded, req);

        if (error) {
          return fail(error);
        }

        const formData: FormData = new FormData();

        formData.append('file', fileUploaded.data, {
          contentType: fileUploaded.mimetype,
          filename: fileUploaded.name,
        });

        const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);

        if (response.status !== 'Success') {
          return fail('uploadError');
        }

        req.session.userCase.miam_domesticAbuseEvidenceDocs = req.session.userCase.miam_domesticAbuseEvidenceDocs
          ? req.session.userCase.miam_domesticAbuseEvidenceDocs
          : [];

        req.session.userCase.miam_domesticAbuseEvidenceDocs?.push(response.document);
        removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
        lastResponse = response;
      }

      if (wantsJson && lastResponse) {
        return this.respondJson(
          req,
          res,
          {
            success: lastResponse.success,
            file: {
              filename: lastResponse.document.document_url.split('/').pop(),
              originalname: lastResponse.document.document_filename,
            },
          },
          uploadUrl
        );
      }
      super.redirect(req, res, uploadFile ? uploadUrl : undefined);
    } catch (e) {
      req.locals.logger.error('Error uploading document', e);
      fail('uploadError');
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue, uploadFile, delete: deleteDocumentId } = req.body;

    if (deleteDocumentId) {
      await runSynchronous(req, res, () => this.deleteDocument(req, res, String(deleteDocumentId)));
      return;
    }

    if (onlyContinue) {
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
      return super.redirect(req, res);
    }

    if (uploadFile || req.files) {
      await runSynchronous(req, res, () => this.uploadDocument(req, res));
      return;
    }

    super.redirect(req, res, this.uploadUrl);
  }
}
