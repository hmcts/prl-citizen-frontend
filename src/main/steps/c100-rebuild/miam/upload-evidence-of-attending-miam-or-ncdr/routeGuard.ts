import { NextFunction, Response } from 'express';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { applyParms } from '../../../../steps/common/url-parser';
import { documentBelongsToCase } from '../../../../steps/common/utils';
import { C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING } from '../../../../steps/urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeFileId } = req.params;

    if (!removeFileId) {
      return next();
    }

    const userDoc = req.session?.userCase?.miam_previousAttendanceEvidenceDoc;

    if (!documentBelongsToCase(removeFileId, userDoc)) {
      handleEvidenceDocError('deleteFile', req, 'miam_previousAttendanceEvidenceDoc');
      return res.redirect(applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING));
    }

    try {
      removeEvidenceDocErrors(req, 'miam_previousAttendanceEvidenceDoc');
      await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
      req.locals.logger.info(
        `miam attendance doc ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
      );
      req.locals.logger.info(
        `Sonar CPD config check ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
      );
      delete req.session.userCase.miam_previousAttendanceEvidenceDoc;
      return req.session.save(() => {
        res.redirect(applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING));
      });
    } catch (error) {
      handleEvidenceDocError('deleteFile', req, 'miam_previousAttendanceEvidenceDoc');
      return res.redirect(applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING));
    }
  },
};
