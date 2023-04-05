/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';

@autobind
export default class CaseWithdrawPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const caseId = req.params.caseId;
    const form = new Form(this.fields as FormFields);
    const { saveAndContinue, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { withdrawApplication, withdrawApplicationReason } = formData as Record<string, any>;

    Object.assign(req.session.userCase, { withdrawApplication, withdrawApplicationReason });
    if (saveAndContinue) {
      req.session.errors = form.getErrors(formData);

      if (!req.session.errors.length && withdrawApplication === YesOrNo.YES) {
        try {
          await req.locals.C100Api.withdrawCase(caseId, {
            withdrawApplication,
            withdrawApplicationReason,
          });
          return super.redirect(req, res);
        } catch (e) {
          return super.redirect(req, res, req.originalUrl);
        }
      } else {
        return super.redirect(req, res);
      }
    }
  }
}
