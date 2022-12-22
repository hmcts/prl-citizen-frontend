import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../people/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const childId = req.params?.childId;

    if (!childId || !getPartyDetails(childId, req.session.userCase.cd_children)) {
      return res.redirect('/error');
    }

    next();
  },
};
