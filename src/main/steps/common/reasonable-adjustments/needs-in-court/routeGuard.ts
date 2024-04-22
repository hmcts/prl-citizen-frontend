import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { RAProvider } from '../../../../modules/reasonable-adjustments';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...RAProvider.utils.cleanSessionForNeedsInCourtSubFields(req.body?.ra_travellingCourt, req.session.userCase),
    };
    req.session.save(next);
  },
};
