import { NextFunction, Response } from 'express';

import { AWPApplicationReason, AWPApplicationType, CaseType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { fetchAndSaveFeeCodeDetails } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const applicationDetails = {
        caseId: req.session.userCase?.id,
        applicationType: req.params.applicationType as AWPApplicationType,
        applicationReason: req.params.applicationReason as AWPApplicationReason,
        caseType: req.session.userCase?.caseTypeOfApplication as CaseType,
        partyType: getCasePartyType(req.session.userCase, req.session.user.id),
      };
      const otherPartyConsent = req.session.userCase?.awp_agreementForRequest;
      const notice = req.session.userCase?.awp_informOtherParties;
      const hearingDate = req.session.userCase?.awp_cancelDelayHearing;

      if (otherPartyConsent) {
        Object.assign(applicationDetails, {
          otherPartyConsent,
        });
      }
      if (notice) {
        Object.assign(applicationDetails, {
          notice,
        });
      }
      if (hearingDate) {
        Object.assign(applicationDetails, {
          hearingDate,
        });
      }

      await fetchAndSaveFeeCodeDetails(req, req.session.user, applicationDetails);

      return next();
    } catch (error) {
      return res.redirect('/error');
    }
  },
};
