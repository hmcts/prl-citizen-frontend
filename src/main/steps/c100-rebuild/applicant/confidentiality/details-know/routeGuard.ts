import { NextFunction, Response } from 'express';

import { YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: (req: AppRequest, res: Response, next: NextFunction) => {
    const applicantDetails = req.session.userCase.appl_allApplicants?.find(
      applicant => applicant.id === req.params.applicantId
    );
    if (req.body.detailsKnown === YesOrNo.YES) {
      delete applicantDetails?.startAlternative;
      delete applicantDetails?.contactDetailsPrivateAlternative;
    } else if (req.body.detailsKnown) {
      delete applicantDetails?.start;
      delete applicantDetails?.contactDetailsPrivate;
    }

    next();
  },
};
