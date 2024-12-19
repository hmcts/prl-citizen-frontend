import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanHearingWithoutNoticePart2 } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanHearingWithoutNoticePart2(
        req.session.userCase,
        req.body.hwn_doYouNeedAWithoutNoticeHearing,
        req.body.hwn_doYouRequireAHearingWithReducedNotice
      ),
    };
    req.session.save(next);
  },
};
