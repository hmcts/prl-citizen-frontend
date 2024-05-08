import { NextFunction, Response } from 'express';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING } from '../../../../steps/urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeFileId } = req.params;

    if (removeFileId && req.session?.userCase?.miam_previousAttendanceEvidenceDoc) {
      try {
        removeEvidenceDocErrors(req, 'miam_previousAttendanceEvidenceDoc');
        await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
        delete req.session.userCase.miam_previousAttendanceEvidenceDoc;
        return req.session.save(() => {
          res.redirect(applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING));
        });
      } catch (error) {
        handleEvidenceDocError('deleteFile', req, 'miam_previousAttendanceEvidenceDoc');
        return res.redirect(applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING));
      }
    }

    next();
  },
};
