import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { getFeesForC100ApplicationSubmission } from '../../../../app/fees/fees-lookup-api';
import { C100_CASE_EVENT } from '../../../../app/case/definition';
import { HOME_URL } from '../../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try{
      await req.locals.C100Api.updateCase(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        req.session.userCase?.caseId as string,
        req.session.userCase,
        req.originalUrl,
        C100_CASE_EVENT.CASE_UPDATE
      );
    const c100ApplicationFees = (await getFeesForC100ApplicationSubmission(req.session.user, req.locals.logger))
      .feeAmount;
    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      c100ApplicationFees,
    };
    req.session.save(next);
  }
catch(error){
  req.locals.logger.error('error in update case', error);
  req.session.save(()=>res.redirect(HOME_URL));
}
}  
};
