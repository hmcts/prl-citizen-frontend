/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import { AppRequest, AppSession } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormError, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { DocCategory, DocType, PartyType } from '../../../app/case/definition';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { getDocumentMeta, getDocumentType } from './util';
import { getPartyName } from '../task-list/utils';

@autobind
export default class DocumentUploadPostController {
  private parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { _ctx, onlycontinue, ...formFields } = req.body;
    const form = new Form(this.fields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { user, userCase: caseData } = req.session;
    const partyType = getCasePartyType(caseData, user.id);
    const uploadedDocuments = caseData?.[partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'] ?? []

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);

      if (req.session.errors.length || !uploadedDocuments?.length) {
        return this.parent.redirect(req, res);
      }

      try {
        const documentMeta = getDocumentMeta(
          req.params.documentCategory as DocCategory,
          req.params.documentType as DocType,
          'en'
        );
        const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
        const response = await client.submitUploadedDocuments(user, {
          caseId: caseData.id,
          categoryId: getDocumentType(documentMeta.type, partyType),
          partyId: user.id,
          partyName: getPartyName(caseData, partyType, user),
          partyType,
          documents: uploadedDocuments
        });
        req.session.errors = [];
        
        if (response.status !== '200') {
          this.handleError(req.session, { errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' })
        }
      } catch (error) {
        this.handleError(req.session, { errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' })
      } finally {
        this.parent.redirect(req, res);
      }
    }
  }

  private handleError(session: AppSession, error: FormError) {
    if (!session.errors) {
      session.errors = []
    }
    session.errors.push({ errorType: error.errorType, propertyName: error.propertyName });
  }
}
