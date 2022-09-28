import autobind from 'autobind-decorator';
import type { Response } from 'express';

import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { EVENT_INTERNATIONAL_ELEMENT, URL_PATTERN_INTERNATIONAL_FACTORS } from '../../../steps/constants';
@autobind
export class InternationalFactorsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      await super.updateCaseWithEventId(req, res, URL_PATTERN_INTERNATIONAL_FACTORS, EVENT_INTERNATIONAL_ELEMENT);
    } catch (err) {
      throw new Error('InternationalFactorsPostController - Case could not be updated.');
    }
  }
}
