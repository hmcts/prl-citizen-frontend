import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { PROCEEDINGS_START } from '../../urls';

import { getProceedingDetails } from './ProceedingDetailsMapper';
export class ProceedingGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const loggedInCitizen = req.session.user;
      const caseReference = req.params?.caseId;

      const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

      const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
      Object.assign(req.session.userCase, caseDataFromCos);

      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (
          respondent?.value?.user?.idamId === req.session?.user.id &&
          respondent?.value?.response &&
          respondent?.value?.response.currentOrPreviousProceedings
        ) {
          Object.assign(req.session.userCase, getProceedingDetails(respondent, req));
        }
      });
      req.session.save(() => res.redirect(PROCEEDINGS_START));
    } catch (err) {
      throw new Error('ProceedingGetController - Case Data could not be retrieved.');
    }
  }
}
