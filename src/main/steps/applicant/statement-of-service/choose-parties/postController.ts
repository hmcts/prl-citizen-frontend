/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCasePartyType } from '../../../../../main/steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../../../main/steps/tasklistresponse/utils';
import { APPLICANT_STATEMENT_OF_SERVICE, APPLICANT_STATEMENT_OF_SERVICE_NEXT } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

import { prepateStatementOfServiceRequest } from './content';

@autobind
export default class StatementOfServicePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    // if (onlycontinue) {
    req.session.errors = form.getErrors(formData);
    if (req.session.errors && req.session.errors.length > 0) {
      res.redirect(APPLICANT_STATEMENT_OF_SERVICE);
    }

    //   return super.redirect(req, res);
    // } else if (saveAndComeLater) {
    //   super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    // }
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');
    if (partyDetails) {
      Object.assign(userCase, prepateStatementOfServiceRequest(req));
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
        throw new Error('MIAMPostController - Case could not be updated.');
      }
    }
    res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT);
  }
}