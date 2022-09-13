import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { RESPONDENT_TASK_LIST_URL } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { CosApiClient } from '../case/CosApiClient';
import { Consent, MiamTable, Respondent } from '../case/definition';
import { toApiDate, toApiFormat } from '../case/to-api-format';
import type { AppRequest } from '../controller/AppRequest';

@autobind
export class SaveRespondentResponseController {
  public async save(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    const caseReference = req.session.userCase.id;

    const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        if (req.url.includes('consent')) {
          this.setConsentDetails(respondent, req);
        }
        else if (req.url.includes('miam')) {
          this.setMIAMDetails(respondent, req);
        }
      }
    });

   const caseData = toApiFormat(req?.session?.userCase);
    caseData.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(
      caseworkerUser,
      caseReference as string,
      caseData,
      'linkCitizenAccount'
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    req.session.save(() => res.redirect(RESPONDENT_TASK_LIST_URL));
  }

  private setConsentDetails(respondent: Respondent, req: AppRequest) {
    let consentFromResponsent: Consent;
    if (respondent?.value?.response && respondent?.value?.response?.consent) {
      consentFromResponsent = respondent?.value?.response?.consent;
      consentFromResponsent.consentToTheApplication = req.session.userCase.doYouConsent;
      consentFromResponsent.noConsentReason = req.session.userCase.reasonForNotConsenting;
      consentFromResponsent.applicationReceivedDate = toApiDate(req.session.userCase.applicationReceivedDate);
      consentFromResponsent.permissionFromCourt = req.session.userCase.courtPermission;
      consentFromResponsent.courtOrderDetails = req.session.userCase.courtOrderDetails;
      respondent.value.response.consent = consentFromResponsent;
    } else {
      respondent.value.response = {
        consent: {
          consentToTheApplication: req.session.userCase.doYouConsent,
          noConsentReason: req.session.userCase.reasonForNotConsenting,
          applicationReceivedDate: toApiDate(req.session.userCase.applicationReceivedDate),
          permissionFromCourt: req.session.userCase.courtPermission,
          courtOrderDetails: req.session.userCase.courtOrderDetails,
        },
      };
    }
  }

  private setMIAMDetails(respondent: Respondent, req: AppRequest) {
    let miamFromResponsent: MiamTable;
    if (respondent?.value?.response && respondent?.value?.response?.miam) {
      miamFromResponsent = respondent?.value?.response?.miam;
      
      miamFromResponsent.applicantAttendedMiam = req.session.userCase.miamStart;
      miamFromResponsent.claimingExemptionMiam = req.session.userCase.miamWillingness;
      miamFromResponsent.familyMediatorServiceName = req.session.userCase.miamNotWillingExplnation;
      
      respondent.value.response.miam = miamFromResponsent;
    } else {
      respondent.value.response = {
        miam: {
          applicantAttendedMiam: req.session.userCase.miamStart,
          claimingExemptionMiam: req.session.userCase.miamWillingness,
          familyMediatorServiceName: req.session.userCase.miamNotWillingExplnation,
        }
      };
    }
  }
}
