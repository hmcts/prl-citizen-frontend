import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { setTextFields } from '../../../../steps/common/confirm-contact-details/checkanswers/ContactDetailsMapper';

import {
  getConfidentialData,
  validateDataCompletion,
} from './../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';
@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;
    Object.assign(req.session.userCase, setTextFields(req));
    getConfidentialData(req);
    validateDataCompletion(req);
    const callback = redirect ? undefined : () => super.get(req, res);
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navFromContactPreferences: false,
    };
    super.saveSessionAndRedirect(req, res, callback);
  }
}
