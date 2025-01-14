import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanHearingWithoutNotice } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanHearingWithoutNotice(req.session.userCase, req.body.hwn_hearingPart1),
    };
    req.session.save(next);
  },
};
