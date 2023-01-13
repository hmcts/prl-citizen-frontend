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
export default class SafteyConcernsAbusePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const abuseType = req.params.abuseType as PRL_C1AAbuseTypes;
    const form = new Form(getFormFields().fields as FormFields);
    const { onlyContinue, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const childAbuseData: Partial<Case> = {
      PRL_c1A_safteyConcerns: {
        ...(req.session.userCase?.PRL_c1A_safteyConcerns ?? {}),
        child: {
          ...((req.session.userCase?.PRL_c1A_safteyConcerns?.child ?? {}) as PRL_C1ASafteyConcerns['child']),
          [abuseType]: transformAbuseFormData(formData),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...childAbuseData,
    };

    if (onlyContinue) {
      super.redirect(req, res);
    }
  }
}
