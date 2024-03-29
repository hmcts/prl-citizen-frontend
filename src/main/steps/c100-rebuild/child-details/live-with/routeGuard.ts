import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { getPartyDetails } from '../../people/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const childId = req.params?.childId;

    if (
      !childId ||
      !(
        getPartyDetails(childId, req.session.userCase?.cd_children) &&
        req.session.userCase?.appl_allApplicants?.length &&
        req.session.userCase?.resp_Respondents?.length
      )
    ) {
      return res.redirect('/error');
    }

    next();
  },
};
