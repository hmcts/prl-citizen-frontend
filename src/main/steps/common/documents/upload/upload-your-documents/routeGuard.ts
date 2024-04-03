import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { deleteDocument } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.query?.documentId) {
      await deleteDocument(req, res);
      return;
    }

    next();
  },
};
