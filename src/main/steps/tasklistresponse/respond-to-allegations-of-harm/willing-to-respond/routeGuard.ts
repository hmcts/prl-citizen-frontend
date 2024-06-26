import { NextFunction, Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.aoh_wishToRespond === YesOrNo.NO) {
      delete req.session.userCase.aoh_responseToAllegations;
      return req.session.save(next);
    }

    next();
  },
};
