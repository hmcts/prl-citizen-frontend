import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { cleanMiamForOtherProceedings } from '../../miam/util';
import { cleanPermissions } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.sq_legalRepresentationApplication === YesOrNo.YES) {
      delete req.session.userCase?.sq_courtPermissionRequired;
      req.session.userCase = cleanPermissions(req.session.userCase);
      delete req.session.userCase?.miam_otherProceedings;
      req.session.userCase = cleanMiamForOtherProceedings(req.session.userCase);
    }
    req.session.save(next);
  },
};
