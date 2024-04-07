import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { mapDataInSession } from '../../../../steps/tasklistresponse/utils';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { DASHBOARD_URL, PARTY_TASKLIST, SIGN_IN_URL } from '../../../urls';
import { applyParms } from '../../url-parser';

@autobind
export default class CaseDetailsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      res.redirect(`${SIGN_IN_URL}?callback=${req.originalUrl}`);
      return;
    }

    try {
      const caseData = await new CosApiClient(req.session.user.accessToken, req.locals.logger).retrieveByCaseId(
        req.params.caseId,
        req.session.user
      );
      req.session.userCase = caseData;

      if (req.session?.userCase) {
        if (req.session?.userCase.caseTypeOfApplication !== 'C100') {
          req.session.userCaseList = [];
        }
        mapDataInSession(req.session.userCase, req.session.user.id);
      }
      const citizenUser = req.session.user;
      const caseId = req.session.userCase.id;
      const client = new CosApiClient(citizenUser.accessToken, req.locals.logger);
      const hearings = await client.retrieveCaseHearingsByCaseId(caseId);
      req.session.userCase.hearingCollection = hearings.caseHearings;

      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req.session.user.id) }));
      });
    } catch (e) {
      res.redirect(DASHBOARD_URL);
    }
  }
  public async load(req: AppRequest, res: Response): Promise<void> {
    try {
      const User = req.session.user;
      const caseID = req.session.userCase.id;
      const caseData = req.session.userCase;
      const cosClient = new CosApiClient(User.accessToken, req.locals.logger);
      const hearings = await cosClient.retrieveCaseHearingsByCaseId(caseID);
      req.session.userCase.hearingCollection = hearings.caseHearings;

      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req.session.user.id) }));
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
