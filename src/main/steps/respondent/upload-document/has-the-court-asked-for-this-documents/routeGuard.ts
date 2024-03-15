import { NextFunction } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body?.hasCourtAskedForThisDoc === YesOrNo.NO) {
      delete req.session.userCase?.reasonForDocumentCantBeShared;
      delete req.session.userCase.haveReasonForDocNotToBeShared;
      req.session.userCase.reasonsToNotSeeTheDocument = [];
      delete req.session.userCase.reasonsToRestrictDocument;
      req.session.userCase.respondentUploadFiles = [];
      delete req.session.userCase.declarationCheck;
      return req.session.save(next);
    }
    next();
  },
};
