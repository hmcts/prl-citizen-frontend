import { NextFunction } from 'express';

import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { C100_URL } from '../../../../../steps/urls';
import { deleteAbuseData } from '../../review/safetyConcernMapper';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    Object.values(C1AAbuseTypes).forEach(abuseType => {
      if (!req.body.c1A_concernAboutApplicant?.includes(abuseType)) {
        deleteAbuseData(
          req.session.userCase,
          abuseType,
          req.originalUrl.startsWith(C100_URL) ? C1ASafteyConcernsAbout.APPLICANT : C1ASafteyConcernsAbout.RESPONDENT
        );
      }
    });

    req.session.save(next);
  },
};
