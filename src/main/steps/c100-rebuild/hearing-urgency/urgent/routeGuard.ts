import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanHearingUrgency } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanHearingUrgency(req.session.userCase, req.body.hu_urgentHearingReasons),
    };
    req.session.save(next);
  },
};
