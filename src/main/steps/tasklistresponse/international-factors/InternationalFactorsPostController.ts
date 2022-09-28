import autobind from 'autobind-decorator';
import type { Response } from 'express';

import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
@autobind
export class InternationalFactorsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    const urlPattern = 'international-factors';
    const eventId = 'internationalElement';
    try {
      await super.updateCaseWithEventId(req, res, urlPattern, eventId);
    } catch (err) {
      throw new Error('InternationalFactorsPostController - Case could not be updated.');
    }
  }
}
