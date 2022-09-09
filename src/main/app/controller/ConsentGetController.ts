import { Response } from 'express';

import { CONSENT_TO_APPLICATION } from '../../steps/urls';
import { Respondent, YesOrNo } from '../case/definition';
import { fromApiDate } from '../case/from-api-format';

import { AppRequest } from './AppRequest';

export class ConsentGetController {
  //constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async getConsent(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.consent
      ) {
        if (respondent?.value?.response?.consent.consentToTheApplication === YesOrNo.NO) {
          req.session.userCase.doYouConsent = YesOrNo.NO;
          req.session.userCase.reasonForNotConsenting = respondent?.value?.response?.consent.noConsentReason;
        } else {
          req.session.userCase.doYouConsent = YesOrNo.YES;
        }
        if (respondent?.value?.response?.consent.permissionFromCourt === YesOrNo.NO) {
          req.session.userCase.courtPermission = YesOrNo.NO;
        } else {
          req.session.userCase.courtPermission = YesOrNo.YES;
          req.session.userCase.courtOrderDetails = respondent?.value?.response?.consent.courtOrderDetails;
        }
        req.session.userCase.applicationReceivedDate = fromApiDate(
          respondent?.value?.response?.consent.applicationReceivedDate
        );
      }
    });
    req.session.save(() => res.redirect(CONSENT_TO_APPLICATION));
  }
}
