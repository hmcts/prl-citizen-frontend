import { NextFunction, Response } from 'express';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { applyParms } from '../../../common/url-parser';
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

    if (removeFileId && req.session?.userCase?.sq_uploadDocument_subfield) {
      try {
        removeEvidenceDocErrors(req, 'sq_uploadDocument_subfield');
        await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
        delete req.session.userCase.sq_uploadDocument_subfield;
        return req.session.save(() => {
          res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
        });
      } catch (error) {
        handleEvidenceDocError('deleteFile', req, 'sq_uploadDocument_subfield');
        return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      }
    }

    next();
  },
};
