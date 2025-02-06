import { NextFunction } from 'express';

import { YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { deleteDataForPreviousAbductions } from '../../review/safetyConcernMapper';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.c1A_childAbductedBefore === YesOrNo.NO) {
      deleteDataForPreviousAbductions(req.session.userCase);
    }

    req.session.save(next);
  },
};
