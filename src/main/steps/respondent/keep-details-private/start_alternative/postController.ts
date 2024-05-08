import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { Form, FormFields } from '../../../../app/form/Form';
import { KeepDetailsPrivatePostController } from '../../../../steps/common/keep-details-private/KeepDetailsPrivatePostController';

@autobind
export default class RespondentKeepDetailsPrivatePostController extends KeepDetailsPrivatePostController {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    const form = new Form(this.fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      startAlternative: formData.startAlternative,
      contactDetailsPrivate: formData.contactDetailsPrivate,
    };
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }
    super.post(req, res);
  }
}
