import { NextFunction, Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.session?.user?.accessToken || !req.session?.userCase?.id) {
        return res.redirect('/error');
      }

      const { hearingData } = await new CosApiClient(
        req.session.user.accessToken,
        req.locals.logger
      ).retrieveCaseHearingsByCaseId(req.session.userCase.id);

      req.session.userCase.hearingCollection = hearingData?.caseHearings ?? [];

      return req.session.save(next);
    } catch (error) {
      return res.redirect('/error');
    }
  },
};
