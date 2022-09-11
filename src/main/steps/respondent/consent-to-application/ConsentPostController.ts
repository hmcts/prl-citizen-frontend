import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { RESPONDENT_TASK_LIST_URL } from '../../urls';

import { setConsentDetails } from './ConsentMapper';

@autobind
export class ConsentPostController {
  public async save(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    const caseReference = req.session.userCase.id;
    let eventId = '';

    const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        if (req.url.includes('consent')) {
          Object.assign(respondent, setConsentDetails(respondent, req));
          eventId = 'consentToTheApplication';
        }
      }
    });

    const caseData = toApiFormat(req?.session?.userCase);
    caseData.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(caseworkerUser, caseReference as string, caseData, eventId);
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    req.session.save(() => res.redirect(RESPONDENT_TASK_LIST_URL));
  }

  // private setConsentDetails(respondent: Respondent, req: AppRequest) {
  //   let consentFromResponsent: Consent;
  //   if (respondent?.value?.response && respondent?.value?.response?.consent) {
  //     consentFromResponsent = respondent?.value?.response?.consent;
  //     consentFromResponsent.consentToTheApplication = req.session.userCase.doYouConsent;
  //     consentFromResponsent.noConsentReason = req.session.userCase.reasonForNotConsenting;
  //     consentFromResponsent.applicationReceivedDate = toApiDate(req.session.userCase.applicationReceivedDate);
  //     consentFromResponsent.permissionFromCourt = req.session.userCase.courtPermission;
  //     consentFromResponsent.courtOrderDetails = req.session.userCase.courtOrderDetails;
  //     respondent.value.response.consent = consentFromResponsent;
  //   } else {
  //     respondent.value.response = {
  //       consent: {
  //         consentToTheApplication: req.session.userCase.doYouConsent,
  //         noConsentReason: req.session.userCase.reasonForNotConsenting,
  //         applicationReceivedDate: toApiDate(req.session.userCase.applicationReceivedDate),
  //         permissionFromCourt: req.session.userCase.courtPermission,
  //         courtOrderDetails: req.session.userCase.courtOrderDetails,
  //       },
  //     };
  //   }
  // }
}
