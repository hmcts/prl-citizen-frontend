/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express';

import { Miam_previousAttendance } from '../../../../app/case/case';
import { MiamNonAttendReason } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanMiamHaveDocForPrevAttendance, isAllowed } from '../util';

export const routeGuard = {
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    if (!isAllowed(MiamNonAttendReason.PREV_MIAM, req.session.userCase)) {
      return res.redirect('error');
    }

    next();
  },

  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { body, session } = req;
    if (body.miam_previousAttendance === Miam_previousAttendance.fourMonthsPriorAttended) {
      req.session.userCase = {
        ...cleanMiamHaveDocForPrevAttendance(session.userCase),
      };
    }

    req.session.save(next);
  },
};
