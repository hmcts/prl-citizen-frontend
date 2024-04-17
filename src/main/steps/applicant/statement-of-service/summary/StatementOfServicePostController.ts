/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getPartyDetails, mapDataInSession } from '../../../../../main/steps/tasklistresponse/utils';
import { APPLICANT_STATEMENT_OF_SERVICE_NEXT } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { prepateStatementOfServiceRequest } from '../choose-parties/StatementOfServiceMapper';
import { getFormFields } from '../choose-parties/content';

@autobind
export default class StatementOfServicePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(getFormFields(req.session.userCase).fields as FormFields);
    const { onlyContinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    if (onlyContinue) {
      req.session.errors = form.getErrors(formData);
      if (req.session.errors.length > 0) {
        return super.redirect(req, res);
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
          await client.saveStatementOfService(
            user,
            userCase.id,
            userCase.caseTypeOfApplication as CaseType,
            userData,
            CaseEvent.CITIZEN_CASE_UPDATE
          ),
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
