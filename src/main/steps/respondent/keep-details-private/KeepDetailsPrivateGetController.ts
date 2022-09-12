import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { RESPONDENT_DETAILS_KNOWN } from '../../urls';

import { getKeepYourDetailsPrivate } from './KeepYourDetailsPrivateMapper';

export class KeepDetailsPrivateGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
    Object.assign(req.session.userCase, caseDataFromCos);

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.keepDetailsPrivate &&
        respondent?.value?.response?.keepDetailsPrivate?.confidentiality
      ) {
        Object.assign(req.session.userCase, getKeepYourDetailsPrivate(respondent, req));
      }
    });
    req.session.save(() => res.redirect(RESPONDENT_DETAILS_KNOWN));
  }
}
