/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getPartyDetails, mapDataInSession } from '../../../../../main/steps/tasklistresponse/utils';
import {
  APPLICANT_STATEMENT_OF_SERVICE_NEXT,
  APPLICANT_STATEMENT_OF_SERVICE_SUMMARY,
} from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { prepateStatementOfServiceRequest } from '../choose-parties/StatementOfServiceMapper';

@autobind
export default class StatementOfServicePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { sosConsent } = req.body;
    if (!sosConsent || sosConsent === '') {
      if (!req.session.errors) {
        req.session.errors = [];
      }
      req.session.errors?.push({
        errorType: 'required',
        propertyName: 'sosConsent',
      });
      if (req.session.errors?.length) {
        req.session.save(() =>
          res.redirect(applyParms(APPLICANT_STATEMENT_OF_SERVICE_SUMMARY, { context: req.params.context }))
        );
      }
    }
    const { user, userCase } = req.session;
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    if (partyDetails) {
      const userData = prepateStatementOfServiceRequest(req);
      req.session.userCase.applicantUploadFiles = undefined;
      req.session.userCase.statementOfServiceDocument = undefined;
      try {
        mapDataInSession(
          await client.saveStatementOfService(user, userCase.id, userData, CaseEvent.CITIZEN_CASE_UPDATE),
          user.id
        );
        req.session.save(() => res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT));
      } catch (error) {
        throw new Error('SOS - Case could not be updated.');
      }
    } else {
      res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT);
    }
  }
}
