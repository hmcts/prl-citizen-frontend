import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.NO) {
      delete req.session.userCase.miam_previousAttendanceEvidenceDoc;
    }
    req.session.save(next);
  },
};
