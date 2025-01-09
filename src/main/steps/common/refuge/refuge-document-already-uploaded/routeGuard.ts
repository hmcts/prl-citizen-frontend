import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.session.userCase.hasOwnProperty('reUploadRefugeDocument')) {
      delete req.session.userCase.reUploadRefugeDocument;
      return req.session.save(next);
    }

    next();
  },
};
