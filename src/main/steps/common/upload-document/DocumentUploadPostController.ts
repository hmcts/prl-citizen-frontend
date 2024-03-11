/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { DocType, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormError, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyName } from '../task-list/utils';

import { getDocumentType, isConfidentialDoc, isRestrictedDoc } from './util';

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
      req.session.errors = [];
      Object.assign(req.session.userCase, formData);
      req.session.errors = form.getErrors(formData);

      if (!uploadedDocuments?.length) {
        this.handleError(req, { errorType: 'nothingToUpload', propertyName: 'uploadFiles' });
      }

      if (req.session.errors.length) {
        return this.parent.redirect(req, res);
      }

      try {
        const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
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
        req.session.errors = [];

        if (response.response.status !== 200) {
          this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
        }
      } catch (error) {
        this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
      } finally {
        this.parent.redirect(req, res);
      }
    }
  }

  private handleError(req: AppRequest, error: FormError) {
    if (!req.session?.errors) {
      req.session.errors = [];
    }
    req.session.errors.push({ errorType: error.errorType, propertyName: error.propertyName });
  }
}
