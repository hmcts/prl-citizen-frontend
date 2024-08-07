import { NextFunction, Response } from 'express';

import { MiamNonAttendReason } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { isAllowed } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    if (!isAllowed(MiamNonAttendReason.URGENT, req.session.userCase)) {
      return res.redirect('error');
    }

    next();
  },
};
