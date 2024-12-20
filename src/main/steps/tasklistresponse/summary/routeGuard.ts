import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { isMandatoryFieldsFilled } from '../../../steps/common/confirm-contact-details/checkanswers/utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const caseData = req.session.userCase;
    if (!isMandatoryFieldsFilled(caseData)) {
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
