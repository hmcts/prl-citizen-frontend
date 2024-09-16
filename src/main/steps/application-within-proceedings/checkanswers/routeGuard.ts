import { NextFunction, Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  },
};
