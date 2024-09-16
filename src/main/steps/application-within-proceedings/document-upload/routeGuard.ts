import { NextFunction, Response } from 'express';

import { caseApi } from '../../../app/case/CaseApi';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeId } = req.params;

    if (removeId) {
      let documentToDelete;

      if (req.session.userCase.awp_uploadedApplicationForms) {
        documentToDelete = req.session.userCase.awp_uploadedApplicationForms.find(
          document => document.url.split('/')[document.url.split('/').length - 1] === removeId
        );
      }

      if (documentToDelete) {
        try {
          req.session.errors = [];
          const userDetails = req?.session?.user;
          await caseApi(userDetails, req.locals.logger).deleteDocument(removeId.toString());
        } catch (error) {
          return next();
        }

        req.session.userCase.awp_uploadedApplicationForms = req.session.userCase?.awp_uploadedApplicationForms?.filter(
          application => application.url.split('/')[application.url.split('/').length - 1] !== removeId
        );

        return req.session.save(next);
      }
    }

    next();
  },
};
