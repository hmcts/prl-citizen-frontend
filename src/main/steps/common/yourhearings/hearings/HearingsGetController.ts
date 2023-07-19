import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { APPLICANT_YOURHEARINGS_HEARINGS, RESPONDENT_YOURHEARINGS_HEARINGS } from '../../../urls';

@autobind
export class HearingsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
    let redirectUrl;
    if (partyType === PartyType.APPLICANT) {
      redirectUrl = APPLICANT_YOURHEARINGS_HEARINGS;
    } else {
      redirectUrl = RESPONDENT_YOURHEARINGS_HEARINGS;
    }

    req.session.save(() => res.redirect(redirectUrl));
    console.log('I am in common hearings get controller');
  }
}
