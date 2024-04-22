import { NextFunction } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { resetUploadDocumentSessionData } from '../upload/utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    resetUploadDocumentSessionData(req);
    req.session.save(next);
  },
};
