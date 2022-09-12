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

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
    Object.assign(req.session.userCase, caseDataFromCos);

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
}
