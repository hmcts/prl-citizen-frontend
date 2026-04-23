import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      req.session.save(next);
    } catch (error) {
      return res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
    }
  },
};
