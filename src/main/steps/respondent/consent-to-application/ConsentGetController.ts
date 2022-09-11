import { Response } from 'express';

import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { CONSENT_TO_APPLICATION } from '../../urls';

import { getConsentDetails } from './ConsentMapper';

export class ConsentGetController {
  public async getConsent(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.consent
      ) {
        Object.assign(req.session.userCase, getConsentDetails(respondent, req));
      }
    });
    req.session.save(() => res.redirect(CONSENT_TO_APPLICATION));
  }
}
