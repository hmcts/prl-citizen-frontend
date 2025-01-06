import { NextFunction, Response } from 'express';
import _ from 'lodash';

import { caseApi } from '../../../../../app/case/CaseApi';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { applyParms } from '../../../../common/url-parser';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeFileId } = req.params;

    if (removeFileId && req.session?.userCase?.miam_domesticAbuseEvidenceDocs) {
      try {
        removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
        await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
        req.session.userCase.miam_domesticAbuseEvidenceDocs =
          req.session.userCase.miam_domesticAbuseEvidenceDocs.filter(
            document => _.toString(_.last(document.document_url.split('/'))) !== removeFileId
          );

        return req.session.save(() => {
          res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
        });
      } catch (error) {
        handleEvidenceDocError('deleteFile', req, 'miam_domesticAbuseEvidenceDocs');
        return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
      }
    }

    next();
  },
};
