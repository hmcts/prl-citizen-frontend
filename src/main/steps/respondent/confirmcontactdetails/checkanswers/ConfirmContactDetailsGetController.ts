import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';

@autobind
export default class ConfirmContactDetailsGetController extends GetController {

  public async get(req: AppRequest, res: Response): Promise<void> {
    let redirect = false;
    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }
}
