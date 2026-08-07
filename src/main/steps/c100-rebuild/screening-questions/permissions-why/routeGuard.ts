import { NextFunction, Response } from 'express';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { applyParms } from '../../../common/url-parser';
import { documentBelongsToCase } from '../../../common/utils';
import { C100_SCREENING_QUESTIONS_PERMISSIONS_WHY } from '../../../urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../miam/util';
import { cleanPermissionsWhy } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      ...cleanPermissionsWhy(req.session.userCase, req.body.sq_permissionsWhy),
    };
    req.session.save(next);
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeFileId } = req.params;

    if (!removeFileId) {
      return next();
    }

    const userDoc = req.session?.userCase?.sq_uploadDocument_subfield;

    if (!documentBelongsToCase(removeFileId, userDoc)) {
      handleEvidenceDocError('deleteFile', req, 'sq_uploadDocument_subfield');
      return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
    }

    try {
      removeEvidenceDocErrors(req, 'sq_uploadDocument_subfield');
      await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
      req.locals.logger.info(
        `[FPVTL-3062] screening-questions doc ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
      );
      req.locals.logger.info(
        `[FPVTL-3062] screening-questions doc ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
      );
      delete req.session.userCase.sq_uploadDocument_subfield;
      return req.session.save(() => {
        res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      });
    } catch (error) {
      handleEvidenceDocError('deleteFile', req, 'sq_uploadDocument_subfield');
      return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
    }
  },
};
