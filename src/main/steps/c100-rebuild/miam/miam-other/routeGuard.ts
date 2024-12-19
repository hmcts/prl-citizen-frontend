import { NextFunction, Response } from 'express';

import { Miam_notAttendingReasons } from '../../../../app/case/case';
import { MiamNonAttendReason } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanMiamNoMediatorReasons, isAllowed } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    if (!isAllowed(MiamNonAttendReason.EXEMPT, req.session.userCase)) {
      res.redirect('error');
      return;
    }
    next();
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.miam_notAttendingReasons !== Miam_notAttendingReasons.canNotAccessMediator) {
      req.session.userCase = {
        ...cleanMiamNoMediatorReasons(req.session.userCase),
      };
    }
    req.session.save(next);
  },
};
