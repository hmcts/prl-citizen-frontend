import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanPermissions } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { body, session } = req;
    if (body.sq_courtPermissionRequired === YesOrNo.NO) {
      req.session.userCase = {
        ...cleanPermissions(session.userCase),
      };
    }
    req.session.save(next);
  },
};
