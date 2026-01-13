import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';

import { generateContent } from './content';

@autobind
export class SignedOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    await super.get(req, res);
  }
}

@autobind
export class SignedOutPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn = {}) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    // Redirect user to sign-in page after they press the button
    return res.redirect('/receiver');
  }
}
