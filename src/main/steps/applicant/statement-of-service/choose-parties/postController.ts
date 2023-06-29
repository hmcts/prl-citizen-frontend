/* eslint-disable @typescript-eslint/no-explicit-any */
//import { CaseWithId } from 'app/case/case';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCasePartyType } from '../../../../../main/steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../../../main/steps/tasklistresponse/utils';
import { APPLICANT_STATEMENT_OF_SERVICE_NEXT } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

import { getFormFields, prepateStatementOfServiceRequest } from './content';

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
      if (req.session.errors && req.session.errors.length > 0) {
        return super.redirect(req, res);
        //return res.redirect(APPLICANT_STATEMENT_OF_SERVICE);
      }
    }
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');
    if (partyDetails) {
      Object.assign(partyDetails, prepateStatementOfServiceRequest(req, formData));
      try {
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CITIZEN_CASE_UPDATE
        );

        req.session.save(() => res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT));
      } catch (error) {
        throw new Error('SOS - Case could not be updated.');
      }
    }
    res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT);
  }
}
