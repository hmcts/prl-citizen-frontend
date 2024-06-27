import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navfromRespondToApplication: true,
    };
    req.session.save(next);
  },
};
