import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { deleteAwpDocument } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeId } = req.params;

    if (removeId) {
      return deleteAwpDocument(req, next, removeId, 'awp_uploadedApplicationForms', 'AWP application doc');
    }

    next();
  },
};
