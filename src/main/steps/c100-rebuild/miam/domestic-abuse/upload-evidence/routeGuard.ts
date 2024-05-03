import { NextFunction, Response } from 'express';

import { caseApi } from '../../../../../app/case/CaseApi';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { applyParms } from '../../../../common/url-parser';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeFileId } = req.params;

    if (removeFileId && req.session?.userCase?.miam_domesticAbuseEvidenceDoc) {
      try {
        removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDoc');
        await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
        delete req.session.userCase.miam_domesticAbuseEvidenceDoc;
        return req.session.save(() => {
          res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
        });
      } catch (error) {
        handleEvidenceDocError('deleteFile', req, 'miam_domesticAbuseEvidenceDoc');
        return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
      }
    }

    next();
  },
};
