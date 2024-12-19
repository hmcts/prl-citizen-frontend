import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanUnselectedMiamExemptions } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanUnselectedMiamExemptions(req.session.userCase, req.body.miam_nonAttendanceReasons),
    };
    req.session.save(next);
  },
};
