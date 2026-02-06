import { NextFunction, Response } from 'express';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_SCREENING_QUESTIONS_PERMISSIONS_WHY } from '../../../../steps/urls';
import { cleanPermissionsWhy } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    const { removeId } = req.params;

    if (removeId && req.session?.userCase?.sq_uploadDocument) {
      try {
        await caseApi(req.session.user, req.locals.logger).deleteDocument(removeId.toString());
        delete req.session.userCase.sq_uploadDocument;

        return req.session.save(() => {
          res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
        });
      } catch {
        req.session.errors = [
          {
            propertyName: 'sq_uploadDocument',
            errorType: 'deleteFile',
          },
        ];

        return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      }
    }
    next();
  },

  post: async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    req.session.userCase = {
      ...cleanPermissionsWhy(req.session.userCase, req.body.sq_permissionsWhy),
    };
    req.session.save(next);
  },
};
