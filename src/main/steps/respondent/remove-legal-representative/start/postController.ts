import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { Form, FormFields } from '../../../../app/form/Form';
import { RemoveLegalRepresentativePostController } from '../../../../steps/common/remove-legal-representative/RemoveLegalRepresentativePostController';

@autobind
export default class RespondentRemoveLegalRepresentativePostController extends RemoveLegalRepresentativePostController {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const form = new Form(this.fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      declarationCheck: formData.declarationCheck,
    };
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length) {
      return this.redirect(req, res);
    }
    super.post(req, res);
  }
}
