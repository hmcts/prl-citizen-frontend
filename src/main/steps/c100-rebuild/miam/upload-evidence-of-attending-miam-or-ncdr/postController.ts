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
import { C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING } from '../../../../steps/urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../util';

@autobind
export default class MIAMAttendanceEvidenceUploadController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private hasError(req: AppRequest): string | undefined {
    let errorType;
    const documentUploaded = _.get(req, 'files.miam_previousAttendanceEvidenceDoc');

    if (req.session.userCase.miam_previousAttendanceEvidenceDoc) {
      errorType = 'multipleFiles';
    } else if (!documentUploaded) {
      errorType = 'required';
    } else if (!isValidFileFormat({ documents: documentUploaded })) {
      errorType = 'invalidFileFormat';
    } else if (isFileSizeGreaterThanMaxAllowed({ documents: documentUploaded })) {
      errorType = 'maxFileSize';
    }

    return errorType;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { uploadFile, onlyContinue } = req.body;
    const miamEvidenceDocument = _.get(req, 'session.userCase.miam_previousAttendanceEvidenceDoc');

    if (onlyContinue && miamEvidenceDocument) {
      removeEvidenceDocErrors(req, 'miam_previousAttendanceEvidenceDoc');

      return super.redirect(req, res);
    }

    const error = this.hasError(req);

    if (error) {
      handleEvidenceDocError(error, req, 'miam_previousAttendanceEvidenceDoc');
      return super.redirect(req, res);
    }

    const fileUploaded = _.get(req, 'files.miam_previousAttendanceEvidenceDoc') as unknown as Record<string, any>;
    const formData: FormData = new FormData();

    formData.append('file', fileUploaded.data, {
      contentType: fileUploaded.mimetype,
      filename: fileUploaded.name,
    });

    try {
      const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);

      if (response.status !== 'Success') {
        handleEvidenceDocError('uploadError', req, 'miam_previousAttendanceEvidenceDoc');
        return super.redirect(req, res);
      }

      req.session.userCase = {
        ...req.session.userCase,
        miam_previousAttendanceEvidenceDoc: response.document,
      };
      removeEvidenceDocErrors(req, 'miam_previousAttendanceEvidenceDoc');
      super.redirect(req, res, uploadFile ? applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING) : undefined);
    } catch (e) {
      handleEvidenceDocError('uploadError', req, 'miam_previousAttendanceEvidenceDoc');
      super.redirect(req, res);
    }
  }
}
