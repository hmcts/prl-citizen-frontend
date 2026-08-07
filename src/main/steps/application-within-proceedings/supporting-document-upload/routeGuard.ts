import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { deleteAWPDocument } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeId } = req.params;

    if (removeId) {
      let documentToDelete;

      if (req.session.userCase.awp_supportingDocuments) {
        documentToDelete = req.session.userCase.awp_supportingDocuments.find(
          document => document.url.split('/')[document.url.split('/').length - 1] === removeId
        );
      }

      if (documentToDelete) {
        try {
          req.session.errors = [];
          await deleteAWPDocument(req, removeId, 'AWP supporting doc');
          req.locals.logger.info(
            `AWP supporting doc ${removeId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
          );
        } catch (error) {
          return next();
        }

        req.session.userCase.awp_supportingDocuments = req.session.userCase?.awp_supportingDocuments?.filter(
          application => application.url.split('/')[application.url.split('/').length - 1] !== removeId
        );

        return req.session.save(next);
      }
    }

    next();
  },
};
