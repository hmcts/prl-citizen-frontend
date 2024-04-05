import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../app/case/CosApiClient';
import { CaseWithId } from '../../app/case/case';
import { EventRoutesContext, PartyType } from '../../app/case/definition';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_CHOOSE_CONTACT_PREFERENCE,
  APPLICANT_DETAILS_KNOWN,
  C7_ATTENDING_THE_COURT,
  CONSENT_TO_APPLICATION,
  INTERNATIONAL_FACTORS_START,
  MIAM_START,
  PROCEEDINGS_START,
  RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CHOOSE_CONTACT_PREFERENCE,
  RESPONDENT_DETAILS_KNOWN,
} from '../urls';

import { mapDataInSession } from './utils';
@autobind
export class TasklistGetController {
  constructor(protected readonly context: EventRoutesContext) {}
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const citizenUser = req.session.user;
      const caseId = req.params?.caseId;
      const client = new CosApiClient(citizenUser.accessToken, req.locals.logger);

      req.session.userCase = await client.retrieveByCaseId(caseId, citizenUser);
      mapDataInSession(req.session.userCase, citizenUser.id);

      req.session.save(() => res.redirect(this.getRedirectUrl(req.session.userCase, citizenUser)));
    } catch (err) {
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
        redirectUrl = RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE;
        break;
      case EventRoutesContext.CONSENT_RESPONSE:
        redirectUrl = CONSENT_TO_APPLICATION;
        break;
      case EventRoutesContext.SUPPORT_DURING_CASE:
        redirectUrl = C7_ATTENDING_THE_COURT;
        break;
      case EventRoutesContext.KEEP_DETAILS_PRIVATE_APPLICANT:
        redirectUrl = APPLICANT_DETAILS_KNOWN;
        break;
      case EventRoutesContext.KEEP_DETAILS_PRIVATE_RESPONDENT:
        redirectUrl = RESPONDENT_DETAILS_KNOWN;
        break;
      case EventRoutesContext.CONFIRM_CONTACT_DETAILS_APPLICANT:
        redirectUrl = APPLICANT_CHECK_ANSWERS;
        break;
      case EventRoutesContext.CONFIRM_CONTACT_DETAILS_RESPONDENT:
        redirectUrl = RESPONDENT_CHECK_ANSWERS;
        break;
      case EventRoutesContext.CONTACT_PREFERENCE:
        redirectUrl =
          getCasePartyType(userCase, user.id) === PartyType.APPLICANT
            ? APPLICANT_CHOOSE_CONTACT_PREFERENCE
            : RESPONDENT_CHOOSE_CONTACT_PREFERENCE;
        break;
    }

    return redirectUrl;
  }
}
