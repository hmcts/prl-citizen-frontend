/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { C100Applicant, C100RebuildPartyDetails, PartyType, RootContext } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { getPartyDetails, updatePartyDetails } from '../../../../steps/c100-rebuild/people/util';
import {
  getUploadedDocumentErrorType,
  handleError,
  removeErrors,
} from '../../../../steps/common/statement-of-service/utils';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { C100_REFUGE_UPLOAD_DOC, C100_URL, REFUGE_UPLOAD_DOC } from '../../../../steps/urls';
import { applyParms } from '../../url-parser';
import { getC8DocumentForC100 } from '../utils';

@autobind
export default class C8RefugeploadDocumentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { session, files } = req;
    const { user, userCase: caseData } = session;
    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);
    const id = req.params.id ? req.params.id : req.params.removeFileId;
    const c100Person = getPeople(caseData).find(person => person.id === id)!;

    req.url = C100rebuildJourney
      ? applyParms(C100_REFUGE_UPLOAD_DOC, {
          root: RootContext.C100_REBUILD,
          id,
        })
      : applyParms(REFUGE_UPLOAD_DOC, {
          root: getCasePartyType(caseData, req.session.user.id),
        });

    const existingDocument = C100rebuildJourney
      ? getC8DocumentForC100(id, caseData, c100Person)
      : caseData?.c8_refuge_document;

    const errorType = getUploadedDocumentErrorType(existingDocument, 'c8RefugeDocument', files);
    if (!_.isEmpty(errorType)) {
      req.session.errors = handleError(req.session.errors, errorType, 'c8RefugeDocument');
      return this.redirect(req, res);
    }

    try {
      const client = new CosApiClient(user.accessToken, req.locals.logger);
      const response = await client.uploadDocument(user, {
        files: [files?.['c8RefugeDocument']],
      });

      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', 'c8RefugeDocument', true);
        return;
      }

      if (C100rebuildJourney) {
        if (c100Person.partyType === PartyType.APPLICANT) {
          const applicantPersonDetails = getPartyDetails(id, req.session.userCase.appl_allApplicants) as C100Applicant;
          Object.assign(applicantPersonDetails, { refugeConfidentialityC8Form: response.document });
          req.session.userCase.appl_allApplicants = updatePartyDetails(
            applicantPersonDetails,
            req.session.userCase.appl_allApplicants
          ) as C100Applicant[];
        } else {
          const otherPersonDetails = getPartyDetails(
            id,
            req.session.userCase.oprs_otherPersons
          ) as C100RebuildPartyDetails;
          Object.assign(otherPersonDetails, { refugeConfidentialityC8Form: response.document });
          req.session.userCase.oprs_otherPersons = updatePartyDetails(
            otherPersonDetails,
            req.session.userCase.oprs_otherPersons
          ) as C100RebuildPartyDetails[];
        }
      } else {
        req.session.userCase.c8_refuge_document = response.document;
      }
      req.session.errors = removeErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', 'c8RefugeDocument', true);
    } finally {
      this.redirect(req, res, req.url);
    }
  }

  private async onContinue(req: AppRequest, res: Response): Promise<void> {
    const { userCase: caseData } = req.session;

    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);
    const id = req.params.id ? req.params.id : req.params.removeFileId;
    const c100Person = getPeople(caseData).find(person => person.id === id)!;
    let uploadedDocument = caseData?.c8_refuge_document;

    if (C100rebuildJourney) {
      uploadedDocument = getC8DocumentForC100(id, caseData, c100Person);
    }

    if (!uploadedDocument?.document_binary_url) {
      req.session.errors = handleError(req.session.errors, 'empty', 'c8RefugeDocument', true);
    }

    this.redirect(req, res);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue, uploadFile } = req.body;

    if (uploadFile) {
      this.uploadDocument(req, res);
    } else if (onlyContinue) {
      this.onContinue(req, res);
    }
  }
}