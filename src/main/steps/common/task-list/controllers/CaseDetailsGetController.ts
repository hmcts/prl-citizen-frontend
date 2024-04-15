import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import CaseDataController from '../../../../steps/common/CaseDataController';
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
      const { caseData } = await new CaseDataController().fetchAndSaveData(req);
      req.session.applicationSettings = {
        ...req.session.applicationSettings,
        navfromRespondToApplication: false,
      };

      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req.session.user.id) }));
      });
    } catch (error) {
      res.redirect(DASHBOARD_URL);
    }
  }
  public async load(req: AppRequest, res: Response): Promise<void> {
    try {
      const User = req.session.user;
      const caseID = req.session.userCase.id;
      const caseData = req.session.userCase;
      const cosClient = new CosApiClient(User.accessToken, req.locals.logger);
      const hearings = await cosClient.retrieveCaseHearingsByCaseId(User, caseID);
      req.session.userCase.hearingCollection = hearings.caseHearings;

      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req.session.user.id) }));
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
