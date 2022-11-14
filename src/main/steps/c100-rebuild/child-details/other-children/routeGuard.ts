import { NextFunction, Response } from 'express';

import { OtherChildrenDetails } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getPartyDetails } from '../../people/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const childId = req.params?.childId as OtherChildrenDetails['id'];

    if (!childId || !getPartyDetails(req.session.userCase.ocd_otherChildren, childId)) {
      return res.redirect('/error');
    }

    next();
  },
};
