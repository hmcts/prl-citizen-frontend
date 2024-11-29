import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanPermissionsWhy } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanPermissionsWhy(req.session.userCase, req.body.sq_permissionsWhy),
    };
    req.session.save(next);
  },
};
