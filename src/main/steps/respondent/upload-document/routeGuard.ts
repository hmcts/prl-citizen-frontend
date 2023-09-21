import { NextFunction } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { resetUploadDocumentSessionData } from '../../../steps/common/upload-document/util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    resetUploadDocumentSessionData(req.session);
    req.session.save();
    next();
  },
};
