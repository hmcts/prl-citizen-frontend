import { NextFunction, Response } from 'express';

import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { isValidAbuseType } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const abuseType = req.params?.abuseType as C1AAbuseTypes;

    if (!isValidAbuseType(abuseType, C1ASafteyConcernsAbout.CHILDREN, req.session.userCase)) {
      return res.redirect('/error');
    }
    next();
  },
};
