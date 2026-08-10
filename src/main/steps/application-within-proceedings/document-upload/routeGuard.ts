import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { deleteAWPDocument } from '../utils';

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
          await deleteAWPDocument(req, removeId, 'AWP application doc');
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
