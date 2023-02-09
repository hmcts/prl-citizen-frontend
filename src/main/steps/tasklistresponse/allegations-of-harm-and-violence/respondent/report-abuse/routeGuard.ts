import { NextFunction, Response } from 'express';

import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbout } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { isValidAbuseType } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const abuseType = req.params?.abuseType as PRL_C1AAbuseTypes;

    if (!isValidAbuseType(abuseType, PRL_C1ASafteyConcernsAbout.RESPONDENT, req.session.userCase)) {
      return res.redirect('/error');
    }
    next();
  },
};
