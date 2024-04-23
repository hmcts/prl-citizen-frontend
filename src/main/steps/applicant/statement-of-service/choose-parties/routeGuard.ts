import { NextFunction, Response } from 'express';

import { handleError, removeUploadDocErrors } from '../../../../../main/steps/common/documents/upload/utils';
import { applyParms } from '../../../../../main/steps/common/url-parser';
import { APPLICANT_STATEMENT_OF_SERVICE } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.query?.documentId) {
      const { query, session } = req;
      const { user: userDetails, userCase: caseData } = session;
      const client = new CosApiClient(userDetails.accessToken, req.locals.logger);
      try {
        await client.deleteCitizenStatementDocument(query.documentId as string);

        if (req.session.userCase && req.session.userCase.hasOwnProperty('applicantUploadFiles')) {
          req.session.userCase['applicantUploadFiles'] = caseData?.['applicantUploadFiles']?.filter(
            document => query.documentId !== document.document_url.substring(document.document_url.lastIndexOf('/') + 1)
          );

          if (req.session.userCase?.['applicantUploadFiles']?.length === 0) {
            delete req.session.userCase['applicantUploadFiles'];
          }
        }

        req.session.errors = removeUploadDocErrors(req.session.errors);
      } catch (e) {
        req.session.errors = handleError(req.session.errors, 'donwloadError', true);
      } finally {
        req.session.save(() => {
          res.redirect(applyParms(APPLICANT_STATEMENT_OF_SERVICE, { context: req.params.context }));
        });
      }
      return;
    }

    next();
  },
};
