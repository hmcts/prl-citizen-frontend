import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { RAProvider } from '../../../../modules/reasonable-adjustments';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body?.ra_disabilityRequirements === YesOrNo.NO) {
      delete req.body.ra_disabilityRequirements_subfield;
    }
    req.session.userCase = {
      ...RAProvider.utils.cleanSessionForLocalComponent(req),
    };
    req.session.save(next);
  },
};
