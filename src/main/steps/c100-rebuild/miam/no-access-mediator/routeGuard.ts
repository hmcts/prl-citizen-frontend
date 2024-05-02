import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.session.userCase.miam_notAttendingReasons !== 'canNotAccessMediator') {
      res.redirect('error');
      return;
    }
    next();
  },
};
