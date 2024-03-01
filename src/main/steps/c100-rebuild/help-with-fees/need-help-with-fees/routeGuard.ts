import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { getFeesForC100ApplicationSubmission } from '../../../../app/fees/fees-lookup-api';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const c100ApplicationFees = (await getFeesForC100ApplicationSubmission(req.session.user, req.locals.logger))
      .feeAmount;
    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      c100ApplicationFees,
    };
    req.session.save(next);
  },
};
