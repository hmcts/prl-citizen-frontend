/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getPartyDetails } from '../../../../../main/steps/tasklistresponse/utils';
import { APPLICANT_STATEMENT_OF_SERVICE_NEXT } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent } from '../../../../app/case/definition';
import { toApiFormat } from '../../../../app/case/to-api-format';
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
      if (
        (req.session.errors && req.session.errors.length > 0) ||
        !req.session.userCase.docIdList ||
        req.session.userCase.docIdList.length === 0
      ) {
        return super.redirect(req, res);
      }
    }
    const { user, userCase } = req.session;
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');
    if (partyDetails) {
      const userData = prepateStatementOfServiceRequest(req, formData);
      let data;
      if (userData && userData.applicants) {
        Object.assign(userCase, userData);
        data = toApiFormat(req?.session?.userCase);
      }
      try {
        req.session.userCase = await client.updateCase(user, userCase.id, data, CaseEvent.STATEMENT_OF_SERVICE);

        req.session.save(() => res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT));
      } catch (error) {
        throw new Error('SOS - Case could not be updated.');
      }
    }
    res.redirect(APPLICANT_STATEMENT_OF_SERVICE_NEXT);
  }
}
