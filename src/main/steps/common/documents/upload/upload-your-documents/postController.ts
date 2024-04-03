/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../../app/case/case';
import { PartyType, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { removeUploadDocErrors } from '../../../../../steps/common/upload-document/util';
import { applyParms } from '../../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../../steps/prl-cases/dashboard/utils';
import { UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS } from '../../../../../steps/urls';
import { getPartyName } from '../../../task-list/utils';
import { UploadDocumentAPICategory, UploadDocumentCategory } from '../../definitions';
import { getUploadedFilesDataReference, handleError } from '../../util';

@autobind
export default class UploadDocumentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private isConfidentialDoc(caseData: Partial<CaseWithId>): YesOrNo {
    return caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES &&
      caseData?.reasonsToNotSeeTheDocument?.includes('hasConfidentailDetails')
      ? YesOrNo.YES
      : YesOrNo.NO;
  }

  private isRestrictedDoc(caseData: Partial<CaseWithId>): YesOrNo {
    return caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES &&
      caseData?.reasonsToNotSeeTheDocument?.includes('containsSentsitiveInformation')
      ? YesOrNo.YES
      : YesOrNo.NO;
  }

  private getDocumentCategory(docCategory: UploadDocumentCategory, partyType: PartyType): UploadDocumentAPICategory {
    let documentCategory;

    switch (docCategory) {
      case UploadDocumentCategory.POSITION_STATEMENTS:
        documentCategory = UploadDocumentAPICategory.POSITION_STATEMENTS;
        break;
      case UploadDocumentCategory.WITNESS_STATEMENTS:
        documentCategory =
          partyType === PartyType.APPLICANT
            ? UploadDocumentAPICategory.APPLICANT_WITNESS_STATEMENTS
            : UploadDocumentAPICategory.RESPONDENT_WITNESS_STATEMENTS;
        break;
      case UploadDocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS:
        documentCategory = UploadDocumentAPICategory.OTHER_PEOPLE_WITNESS_STATEMENTS;
        break;
      case UploadDocumentCategory.MEDICAL_RECORDS:
        documentCategory = UploadDocumentAPICategory.MEDICAL_RECORDS;
        break;
      case UploadDocumentCategory.MEDICAL_REPORTS:
        documentCategory = UploadDocumentAPICategory.MEDICAL_REPORTS;
        break;
      case UploadDocumentCategory.EMAIL_IMAGES_MEDIA:
        documentCategory = UploadDocumentAPICategory.EMAIL_IMAGES_MEDIA;
        break;
      case UploadDocumentCategory.LETTERS_FROM_SCHOOL:
        documentCategory =
          partyType === PartyType.APPLICANT
            ? UploadDocumentAPICategory.LETTERS_FROM_SCHOOL_APPLICANT
            : UploadDocumentAPICategory.LETTERS_FROM_SCHOOL_RESPONDENT;
        break;
      case UploadDocumentCategory.TENANCY_AND_MORTGAGE_AGREEMENTS:
        documentCategory = UploadDocumentAPICategory.TENANCY_AND_MORTGAGE_AGREEMENTS;
        break;
      case UploadDocumentCategory.PREVIOUS_ORDERS_SUBMITTED:
        documentCategory =
          partyType === PartyType.APPLICANT
            ? UploadDocumentAPICategory.PREVIOUS_ORDERS_SUBMITTED_APPLICANT
            : UploadDocumentAPICategory.PREVIOUS_ORDERS_SUBMITTED_RESPONDENT;
        break;
      case UploadDocumentCategory.PATERNITY_TEST_REPORTS:
        documentCategory = UploadDocumentAPICategory.PATERNITY_TEST_REPORTS;
        break;
      case UploadDocumentCategory.DRUG_ALCOHOL_TESTS:
        documentCategory = UploadDocumentAPICategory.DRUG_ALCOHOL_TESTS;
        break;
      case UploadDocumentCategory.POLICE_REPORTS:
        documentCategory = UploadDocumentAPICategory.POLICE_REPORTS;
        break;
      case UploadDocumentCategory.OTHER_DOCUMENTS:
        documentCategory = UploadDocumentAPICategory.OTHER_DOCUMENTS;
        break;
    }

    return documentCategory;
  }

  private setRedirectUrl(partyType: PartyType, req: AppRequest<Partial<CaseWithId>>) {
    return applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
      partyType,
      docCategory: req.params.docCategory,
    });
  }

  private initializeData(caseData: Partial<CaseWithId>): void {
    if (!caseData?.applicantUploadFiles) {
      caseData['applicantUploadFiles'] = [];
    }

    if (!caseData.respondentUploadFiles) {
      caseData['respondentUploadFiles'] = [];
    }
  }

  private async generateDocument(req: AppRequest, res: Response): Promise<void> {
    const { params, session, body } = req;
    const { user, userCase: caseData } = session;
    const partyType = getCasePartyType(caseData, user.id);
    const redirectUrl = this.setRedirectUrl(partyType, req);
    const statementText = _.get(body, 'statementText', '') as string;

    req.url = redirectUrl;
    this.initializeData(caseData);

    if (!statementText) {
      req.session.errors = handleError(req.session.errors, 'empty');
      return this.redirect(req, res, redirectUrl);
    }

    const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
    try {
      const response = await client.generateStatementDocument(user, {
        caseId: caseData.id,
        categoryId: this.getDocumentCategory(params.docCategory as UploadDocumentCategory, partyType),
        partyId: user.id,
        partyName: getPartyName(caseData, partyType, user),
        partyType,
        freeTextStatements: statementText,
      });

      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }
      req.session.userCase?.[getUploadedFilesDataReference(partyType)]?.push(response.document);
      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  private async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { session, files } = req;
    const { user, userCase: caseData } = session;
    const partyType = getCasePartyType(caseData, user.id);
    const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
    const redirectUrl = this.setRedirectUrl(partyType, req);

    req.url = redirectUrl;
    this.initializeData(caseData);

    if (!files) {
      req.session.errors = handleError(req.session.errors, 'empty');
      return this.redirect(req, res, redirectUrl);
    }

    try {
      const response = await client.uploadStatementDocument(user, {
        files: [files['files[]']],
      });

      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }

      req.session.userCase?.[
        partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'
      ]?.push(response.document);
      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  private async submitDocuments(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase: caseData } = req.session;
    const fields = typeof this.fields === 'function' ? this.fields(caseData) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const partyType = getCasePartyType(caseData, user.id);
    const uploadedDocuments = caseData?.[getUploadedFilesDataReference(partyType)] ?? [];

    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (!uploadedDocuments?.length) {
      req.session.errors = handleError(req.session.errors, 'empty', true);
    }

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    try {
      const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
      const response = await client.submitUploadedDocuments(user, {
        caseId: caseData.id,
        categoryId: this.getDocumentCategory(req.params.docCategory as UploadDocumentCategory, partyType),
        partyId: user.id,
        partyName: getPartyName(caseData, partyType, user),
        partyType,
        isConfidential: this.isConfidentialDoc(caseData),
        isRestricted: this.isRestrictedDoc(caseData),
        restrictDocumentDetails: _.get(caseData, 'reasonsToRestrictDocument', ''),
        documents: uploadedDocuments,
      });

      if (response.data !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }

      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (error) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res);
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue: submitDocument, generateDocument, uploadFile } = req.body;

    if (generateDocument) {
      this.generateDocument(req, res);
    } else if (uploadFile) {
      this.uploadDocument(req, res);
    } else if (submitDocument) {
      this.submitDocuments(req, res);
    }
  }
}
