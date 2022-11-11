import { NextFunction, Response } from 'express';

import { ChildrenDetails } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../people/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const childId = req.params?.childId as ChildrenDetails['id'];

    if (!childId || !getPartyDetails(req.session.userCase.cd_children, childId)) {
      return res.redirect('/error');
    }

    next();
  },
};
