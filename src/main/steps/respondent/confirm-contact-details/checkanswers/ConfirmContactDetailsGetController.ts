import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import {
  getConfidentialData,
  validateDataCompletion,
} from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';
import { setTextFields } from '../../../../steps/common/confirm-contact-details/checkanswers/ContactDetailsMapper';

@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;
    Object.assign(req.session.userCase, setTextFields(req, res));
    validateDataCompletion(req);
    getConfidentialData(req);
    const callback = redirect ? undefined : () => super.get(req, res);
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navFromContactPreferences: false,
    };
    super.saveSessionAndRedirect(req, res, callback);
  }
}
