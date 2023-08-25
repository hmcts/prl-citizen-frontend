import { NextFunction, Response } from 'express';


import { AppRequest } from '../../../app/controller/AppRequest';
import { YesOrNo } from '../../../app/case/definition';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.session.userCase.awp_need_hwf === YesOrNo.NO) {
      delete req.session.userCase.awp_have_hwfReference;
      delete req.session.userCase.awp_hwf_referenceNumber;
    }
    if (req.session.userCase.awp_have_hwfReference === YesOrNo.NO) {
      delete req.session.userCase.awp_hwf_referenceNumber;
    }
    if (req.session.userCase.awp_hasSupportingDocuments === YesOrNo.NO) {
      delete req.session.userCase.awp_supportingDocuments;
    }

        return req.session.save(next);

    next();
  }
};
