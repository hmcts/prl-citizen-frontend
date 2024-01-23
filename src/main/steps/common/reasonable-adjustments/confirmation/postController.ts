import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { RAProvider } from '../../../../modules/reasonable-adjustments';

@autobind
export default class ReasonableAdjustmentsConfirmationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue } = req.body;

    return super.redirect(req, res, onlyContinue ? RAProvider.utils.getNavigationUrl(req) : req.originalUrl);
  }
}
