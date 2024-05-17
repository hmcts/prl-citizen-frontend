import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { EventRoutesContext, RootContext } from '../../app/case/definition';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import CaseDataController from '../../steps/common/CaseDataController';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import {
  APPLICANT_CHECK_ANSWERS,
  C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  CHOOSE_CONTACT_PREFERENCE,
  CONSENT_TO_APPLICATION,
  DETAILS_KNOWN,
  INTERNATIONAL_FACTORS_START,
  MIAM_START,
  PARTY_YOUR_HEARINGS,
  PROCEEDINGS_START,
  PageLink,
  //RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  RESPONDENT_CHECK_ANSWERS,
} from '../urls';

@autobind
export class TasklistGetController {
  constructor(protected readonly context: EventRoutesContext) {}
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      await new CaseDataController(
        this.context === EventRoutesContext.HEARINGS ? ['hearingDetails'] : []
      ).fetchAndSaveData(req);
      res.redirect(this.getRedirectUrl(req.session.userCase, req.session.user));
    } catch (error) {
      throw new Error('Case Data could not be retrieved.');
    }
  }

  private getRedirectUrl(userCase: CaseWithId, user: UserDetails) {
    let redirectUrl;
    switch (this.context) {
      case EventRoutesContext.INTERNATIONAL_FACTORS_RESPONSE:
        redirectUrl = INTERNATIONAL_FACTORS_START;
        break;
      case EventRoutesContext.MIAM_RESPONSE:
        redirectUrl = MIAM_START;
        break;
      case EventRoutesContext.PROCEEDINGS_RESPONSE:
        redirectUrl = PROCEEDINGS_START;
        break;
      case EventRoutesContext.SAFETY_CONCERNS_RESPONSE:
        redirectUrl = applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { root: RootContext.RESPONDENT }) as PageLink;
        break;
      case EventRoutesContext.CONSENT_RESPONSE:
        redirectUrl = CONSENT_TO_APPLICATION;
        break;
      case EventRoutesContext.KEEP_DETAILS_PRIVATE:
        redirectUrl = applyParms(DETAILS_KNOWN, { partyType: getCasePartyType(userCase, user.id) });
        break;
      case EventRoutesContext.CONFIRM_CONTACT_DETAILS_APPLICANT:
        redirectUrl = APPLICANT_CHECK_ANSWERS;
        break;
      case EventRoutesContext.CONFIRM_CONTACT_DETAILS_RESPONDENT:
        redirectUrl = RESPONDENT_CHECK_ANSWERS;
        break;
      case EventRoutesContext.CONTACT_PREFERENCE:
        redirectUrl = applyParms(CHOOSE_CONTACT_PREFERENCE, { partyType: getCasePartyType(userCase, user.id) });
        break;
      case EventRoutesContext.HEARINGS:
        redirectUrl = applyParms(PARTY_YOUR_HEARINGS, { partyType: getCasePartyType(userCase, user.id) });
        break;
    }

    return redirectUrl;
  }
}
