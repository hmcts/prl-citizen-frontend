import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanMiamDocument, cleanMiamValidReason } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { body, session } = req;
    if (body.miam_attendance === YesOrNo.YES) {
      req.session.userCase = {
        ...cleanMiamValidReason(session.userCase),
      };
    } else if (body.miam_attendance === YesOrNo.NO) {
      req.session.userCase = {
        ...cleanMiamDocument(session.userCase),
      };
    }
    req.session.save(next);
  },
};
