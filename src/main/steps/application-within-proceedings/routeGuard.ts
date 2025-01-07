import { NextFunction, Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { isRepresentedBySolicotor } from '../../steps/common/task-list/utils';
import { applyParms } from '../../steps/common/url-parser';
import { DASHBOARD_URL, FETCH_CASE_DETAILS } from '../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.session?.userCase?.id) {
        return res.redirect(DASHBOARD_URL);
      }

      if (isRepresentedBySolicotor(req.session.userCase, req.session.user.id)) {
        return res.redirect(applyParms(FETCH_CASE_DETAILS, { caseId: req.session.userCase.id }));
      }

      next();
    } catch (error) {
      return res.redirect('/error');
    }
  },
};
