import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { deleteDocument } from '../../upload/utils';
import { isDocumentOwnedByUser } from '../../utils/ownership';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const rawDocumentId = req.query?.documentId as string | undefined;
    const documentId = rawDocumentId?.trim();

    if (documentId) {
      const owned = isDocumentOwnedByUser(req.session.userCase, documentId, [
        'applicantUploadFiles',
        'respondentUploadFiles',
      ]);

      if (!owned) {
        req.locals?.logger?.warn?.(
          `Blocked attempt to delete document ${documentId} not owned by case ${req.session.userCase?.id}`
        );
        req.session.errors = [{ errorType: 'deleteError', propertyName: 'uploadDocumentFileUpload' }];
        return req.session.save(() => next());
      }

      await deleteDocument(req, res);
      return;
    }

    next();
  },
};
