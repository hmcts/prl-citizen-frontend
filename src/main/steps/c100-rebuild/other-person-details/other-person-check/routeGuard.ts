import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanOtherPeopleDetails } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanOtherPeopleDetails(req.session.userCase, req.body.oprs_otherPersonCheck),
    };
    req.session.save(next);
  },
};
