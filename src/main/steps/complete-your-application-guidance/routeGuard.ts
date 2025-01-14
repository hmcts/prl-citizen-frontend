/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { getC100ApplicationFee } from '../../app/fees/fees-lookup-api';

export const routeGuard = {
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.session.userCase) {
      delete req.session.userCase.applicationPayOnline;
      delete req.session.userCase.legalRepresentativeForProceedings;
      delete req.session.userCase.legalRepresentativeForApplication;
    }

    const feeDetails = await getC100ApplicationFee(req.session.user, req.locals.logger, true);

    if (feeDetails?.errorRetrievingResponse) {
      //set default value or throw error then set default in content
      feeDetails.feeAmount = '255'; //temp
    }

    req.session.userCase = {
      ...req.session.userCase,
      c100ApplicationFees: feeDetails.feeAmount,
    };
    return req.session.save(next);
  },

  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    delete req.session.userCase.c100ApplicationFees;
    return req.session.save(next);
  },
};
