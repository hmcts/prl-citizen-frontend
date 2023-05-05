import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { INTERNATIONAL_FACTORS_START } from '../../urls';

import { mapInternationalFactorsDetails } from './InternationalFactorsMapper';
export class InternationalFactorsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const citizenUser = req.session.user;
      const caseId = req.params?.caseId;

      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');

      const caseDataFromCCD = await client.retrieveByCaseId(caseId, citizenUser);
      Object.assign(req.session.userCase, caseDataFromCCD);

      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (
          respondent?.value?.user?.idamId === req.session?.user.id &&
          respondent?.value?.response &&
          respondent?.value?.response.citizenInternationalElements
        ) {
          Object.assign(req.session.userCase, mapInternationalFactorsDetails(respondent));
        }
      });
      req.session.save(() => res.redirect(INTERNATIONAL_FACTORS_START));
    } catch (err) {
      throw new Error('InternationalFactorsGetController - Case Data could not be retrieved.');
    }
  }
}
