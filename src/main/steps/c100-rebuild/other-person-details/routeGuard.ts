import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../people/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const otherPersonId = req.params?.otherPersonId;

    if (!otherPersonId || !getPartyDetails(otherPersonId, req.session.userCase.oprs_otherPersons)) {
      return res.redirect('/error');
    }
    next();
  },
};
