import { NextFunction } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { clearSessionData } from '../../../steps/common/upload-document/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    clearSessionData(req);
    next();
  },
};
