import { NextFunction, Response } from 'express';

import { Case } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getFeesForC100ApplicationSubmission } from '../../../../app/fees/fees-lookup-api';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      await req.locals.C100Api.saveC100DraftApplication(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        req.session.userCase?.caseId as string,
        req.session.userCase,
        req.originalUrl
      );
      await retriveFeeAmount(req, next);
    } catch {
      await retriveFeeAmount(req, next);
    }
  },
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const retriveFeeAmount = async (req: AppRequest<Partial<Case>>, next: NextFunction) => {
  try {
    const c100ApplicationFees = (await getFeesForC100ApplicationSubmission(req.session.user, req.locals.logger))
      .feeAmount;
    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      c100ApplicationFees,
    };
    req.session.save(next);
  } catch {
    req.session.save(next);
  }
};
