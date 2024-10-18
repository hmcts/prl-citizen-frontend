import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { deleteDocument } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const userCase = req.session.userCase;
    // if (userCase.appl_allApplicants?.find(applicant => applicant.id === req.params?.removeFileId)) {
    //   next();
    // }
    if (
      req.params?.removeFileId &&
      !userCase.appl_allApplicants?.find(applicant => applicant.id === req.params?.removeFileId)
    ) {
      await deleteDocument(req, res, req.params?.applicantId);
      return;
    }

    next();
  },
};
