import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanCurrentPreviousProceedings } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanCurrentPreviousProceedings(
        req.session.userCase,
        req.body.op_childrenInvolvedCourtCase,
        req.body.op_courtOrderProtection
      ),
    };
    req.session.save(next);
  },
};
