import { NextFunction } from 'express';

import { YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { deleteDataForPassports } from '../../review/safetyConcernMapper';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.c1A_passportOffice === YesOrNo.NO) {
      deleteDataForPassports(req.session.userCase);
    }

    req.session.save(next);
  },
};
