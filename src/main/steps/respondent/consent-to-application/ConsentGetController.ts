import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { CONSENT_TO_APPLICATION } from '../../urls';

import { getConsentDetails } from './ConsentMapper';

export class ConsentGetController {
  public async getConsent(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
    Object.assign(req.session.userCase, caseDataFromCos);

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.consent &&
        respondent?.value?.response?.consent?.consentToTheApplication
      ) {
        Object.assign(req.session.userCase, getConsentDetails(respondent, req));
      }
    });
    req.session.save(() => res.redirect(CONSENT_TO_APPLICATION));
  }
}
