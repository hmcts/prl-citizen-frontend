import { NextFunction, Response } from 'express';

import { C100RebuildPartyDetails } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

import { getOtherPersonDetails } from './util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const otherPersonId = req.params?.otherPersonId as C100RebuildPartyDetails['id'];

    if (!otherPersonId || !getOtherPersonDetails(req.session.userCase.oprs_otherPersons ?? [], otherPersonId)) {
      return res.redirect('/error');
    }
    next();
  },
};
