import { NextFunction } from 'express';

import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { C100_URL } from '../../../../steps/urls';
import { deleteAbuseData, deleteDataForAbduction } from '../review/safetyConcernMapper';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (!req.body.c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN)) {
      Object.values(C1AAbuseTypes).forEach(abuseType => {
        deleteAbuseData(req.session.userCase, abuseType, 'child');
      });
      delete req.session.userCase.c1A_concernAboutChild;
      deleteDataForAbduction(req.session.userCase);
    }

    const partyType = req.originalUrl.startsWith(C100_URL)
      ? C1ASafteyConcernsAbout.APPLICANT
      : C1ASafteyConcernsAbout.RESPONDENT;

    if (!req.body.c1A_safetyConernAbout?.includes(partyType)) {
      Object.values(C1AAbuseTypes).forEach(abuseType => {
        deleteAbuseData(req.session.userCase, abuseType, partyType);
      });

      if (partyType === C1ASafteyConcernsAbout.APPLICANT) {
        delete req.session.userCase.c1A_concernAboutApplicant;
      } else {
        delete req.session.userCase.c1A_concernAboutRespondent;
      }
    }

    req.session.save(next);
  },
};
