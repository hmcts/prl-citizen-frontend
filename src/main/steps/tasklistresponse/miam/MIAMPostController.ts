import autobind from 'autobind-decorator';
import type { Response } from 'express';

import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { EVENT_RESPONDENT_MIAM, RESPONSE_MIAM_ELEMENTS } from '../../../steps/constants';
@autobind
export class MIAMPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      super.updateCaseWithEventId(req, res, RESPONSE_MIAM_ELEMENTS, EVENT_RESPONDENT_MIAM);
    } catch (err) {
      throw new Error('MIAMPostController - Case could not be updated.');
    }
  }
}
