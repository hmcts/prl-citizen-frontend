import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { DASHBOARD_URL } from '../../../steps/urls';
import { resetAWPApplicationData } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      resetAWPApplicationData(req);

      if (!req.session?.userCase) {
        return res.redirect(DASHBOARD_URL);
      }

      return req.session.save(next);
    } catch (error) {
      return res.redirect('/error');
    }
  },
};
