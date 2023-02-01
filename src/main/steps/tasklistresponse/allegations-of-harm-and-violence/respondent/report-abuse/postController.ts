import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcerns } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { transformAbuseFormData } from '../../util';

import { getFormFields } from './content';

@autobind
export default class SafteyConcernsApplicantAbusePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const abuseType = req.params.abuseType as PRL_C1AAbuseTypes;
    const form = new Form(getFormFields().fields as FormFields);
    const { onlyContinue, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const respondentAbuseData: Partial<Case> = {
      PRL_c1A_safteyConcerns: {
        ...(req.session.userCase?.PRL_c1A_safteyConcerns ?? {}),
        respondent: {
          ...((req.session.userCase?.PRL_c1A_safteyConcerns?.respondent ?? {}) as PRL_C1ASafteyConcerns['respondent']),
          [abuseType]: transformAbuseFormData(formData),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...respondentAbuseData,
    };

    if (onlyContinue) {
      super.redirect(req, res);
    }
  }
}
