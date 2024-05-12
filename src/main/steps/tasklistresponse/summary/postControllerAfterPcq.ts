import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../urls';

export class ResponseSummaryConfirmationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    //TODO update when merged with response submission fixes
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      declarationCheck: formData.declarationCheck,
    };
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    const caseReference = req.session.userCase.id;
    let partyId;
    req.session.userCase.respondents?.forEach(respondent => {
      if (respondent.value.user.idamId === req.session.user.id) {
        partyId = respondent.id;
      }
    });
    const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
    const caseData = toApiFormat(req?.session?.userCase);

    const updatedCaseDataFromCos = await client.submitRespondentResponse(caseReference, partyId, caseData);
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    req.session.save(() => res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION));
  }
}
