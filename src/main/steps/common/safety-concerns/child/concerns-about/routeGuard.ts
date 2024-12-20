import { NextFunction } from 'express';

import { C1AAbuseTypes } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { deleteAbuseData, deleteDataForAbduction } from '../../review/safetyConcernMapper';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    Object.values(C1AAbuseTypes).forEach(abuseType => {
      if (!req.body.c1A_concernAboutChild?.includes(abuseType)) {
        deleteAbuseData(req.session.userCase, abuseType, 'child');
        if (abuseType === C1AAbuseTypes.ABDUCTION) {
          deleteDataForAbduction(req.session.userCase);
        }
      }
    });

    req.session.save(next);
  },
};
