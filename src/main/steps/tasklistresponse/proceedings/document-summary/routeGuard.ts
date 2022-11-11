import { NextFunction, Response } from 'express';

import { ProceedingsOrderTypeInterface } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { isAnyOrderWithDocument } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const orderSessionData = req.session?.userCase?.otherProceedings?.order ?? ({} as ProceedingsOrderTypeInterface);

    if (!isAnyOrderWithDocument(orderSessionData)) {
      return res.redirect('error');
    }

    next();
  },
};
