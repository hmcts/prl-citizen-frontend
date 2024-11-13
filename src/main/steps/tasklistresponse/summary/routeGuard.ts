import { NextFunction, Response } from 'express';
import _ from 'lodash';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const caseData = req.session.userCase;
    if (caseData.isCitizenLivingInRefuge === YesOrNo.YES && _.isEmpty(caseData.refugeDocument)) {
      req.session.errors = [
        {
          propertyName: 'refugeDocumentText',
          errorType: 'required',
        },
      ];
    }
    req.session.save(next);
  },
};
