import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import CaseDataController from '../../CaseDataController';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      await new CaseDataController().fetchAndSaveData(req);
      next();
    } catch (error) {
      throw new Error(error);
    }
  },
};
