import { NextFunction, Response } from 'express';

import { AWPApplicationReason, AWPApplicationType, CaseType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS } from '../../../steps/urls';
import { fetchAndSaveFeeCodeDetails, getApplicationDetails } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const caseTypeOfApplication = req.session.userCase?.caseTypeOfApplication as CaseType;
    const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
    const language = req.session.lang ?? 'en';
    const applicationType = req.params.applicationType as AWPApplicationType;
    const applicationReason = req.params.applicationReason as AWPApplicationReason;

    try {
      await fetchAndSaveFeeCodeDetails(req, req.session.user, {
        caseId: req.session.userCase.id,
        applicationType,
        applicationReason,
        caseType: caseTypeOfApplication,
        partyType,
      });

      const awpApplicationDetails = getApplicationDetails(
        applicationType,
        applicationReason,
        caseTypeOfApplication,
        partyType,
        language,
        req.session
      );

      if (awpApplicationDetails) {
        req.session.applicationSettings = {
          ...req.session.applicationSettings,
          awpSelectedApplicationDetails: {
            language,
            ...awpApplicationDetails,
          },
        };

        return req.session.save(next);
      }

      return next();
    } catch (error) {
      return res.redirect(
        applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, { partyType, pageNumber: '1' })
      );
    }
  },
};
