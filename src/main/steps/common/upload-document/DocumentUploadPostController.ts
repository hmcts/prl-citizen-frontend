/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { DocType, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyName } from '../task-list/utils';

import {
  getDocumentType,
  handleUploadDocError,
  isConfidentialDoc,
  isRestrictedDoc,
  removeUploadDocErrors,
} from './util';

@autobind
export default class DocumentUploadPostController {
  private parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase: caseData } = req.session;
    const { _ctx, onlyContinue, ...formFields } = req.body;
    const fields = typeof this.fields === 'function' ? this.fields(caseData) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const partyType = getCasePartyType(caseData, user.id);
    const uploadedDocuments =
      caseData?.[partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'] ?? [];

    if (onlyContinue) {
      Object.assign(req.session.userCase, formData);
      req.session.errors = form.getErrors(formData);

      if (!uploadedDocuments?.length) {
        req.session.errors = handleUploadDocError(req.session.errors, 'empty', true);
      }

      if (req.session.errors.length) {
        return this.parent.redirect(req, res);
      }

      try {
        const client = new CosApiClient(user.accessToken, req.locals.logger);
        const response = await client.submitUploadedDocuments(user, {
          caseId: caseData.id,
          categoryId: getDocumentType(req.params.docType as DocType, partyType),
          partyId: user.id,
          partyName: getPartyName(caseData, partyType, user),
          partyType,
          isConfidential: isConfidentialDoc(caseData),
          isRestricted: isRestrictedDoc(caseData),
          restrictDocumentDetails: _.get(caseData, 'reasonsToRestrictDocument', ''),
          documents: uploadedDocuments,
        });

        if (response.data !== 'Success') {
          req.session.errors = handleUploadDocError(req.session.errors, 'uploadError', true);
          return;
        }

        req.session.errors = {
          ...removeUploadDocErrors(req.session.errors),
        };
      } catch (error) {
        req.session.errors = handleUploadDocError(req.session.errors, 'uploadError', true);
      } finally {
        this.parent.redirect(req, res);
      }
    }
  }
}
