import { NextFunction, Response } from 'express';

import { Miam_notAttendingReasons } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.session.userCase.miam_notAttendingReasons !== Miam_notAttendingReasons.canNotAccessMediator) {
      return res.redirect('error');
    }
    next();
  },
};
