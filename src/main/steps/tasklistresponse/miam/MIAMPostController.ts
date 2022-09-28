import autobind from 'autobind-decorator';
import type { Response } from 'express';

import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
@autobind
export class MIAMPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    const urlPattern = 'miam';
    const eventId = 'respondentMiam';
    try {
      super.updateCaseWithEventId(req, res, urlPattern, eventId);
    } catch (err) {
      throw new Error('MIAMPostController - Case could not be updated.');
    }
  }
}
