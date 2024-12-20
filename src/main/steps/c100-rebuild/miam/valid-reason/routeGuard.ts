import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanMiamExemptions } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { body, session } = req;
    if (body.miam_validReason === YesOrNo.NO) {
      req.session.userCase = {
        ...cleanMiamExemptions(session.userCase),
      };
    }
    req.session.save(next);
  },
};
