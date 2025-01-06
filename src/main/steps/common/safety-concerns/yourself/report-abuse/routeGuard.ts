import { NextFunction, Response } from 'express';

import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { C100_URL } from '../../../../urls';
import { isValidAbuseType } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const abuseType = req.params?.abuseType as C1AAbuseTypes;
    const context = req.originalUrl.startsWith(C100_URL)
      ? C1ASafteyConcernsAbout.APPLICANT
      : C1ASafteyConcernsAbout.RESPONDENT;

    if (!isValidAbuseType(abuseType, context, req.session.userCase)) {
      return res.redirect('/error');
    }
    next();
  },
};
