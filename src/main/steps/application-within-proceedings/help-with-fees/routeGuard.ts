import { NextFunction, Response } from 'express';

import { AWPApplicationReason, AWPApplicationType, CaseType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../steps/urls';
import { fetchAndSaveFeeCodeDetails, isFreeApplication } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
      const applicationReason = req.params.applicationReason as AWPApplicationReason;
      const applicationType = req.params.applicationType as AWPApplicationType;
      const otherPartyConsent = req.session.userCase?.awp_agreementForRequest;
      const notice = req.session.userCase?.awp_informOtherParties;
      const hearingDate = req.session.userCase?.awp_cancelDelayHearing;
      const applicationDetails = {
        caseId: req.session.userCase?.id,
        applicationType,
        applicationReason,
        caseType: req.session.userCase?.caseTypeOfApplication as CaseType,
        partyType,
      };

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

      if (isFreeApplication(req.session.userCase)) {
        return res.redirect(
          applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            partyType,
            applicationType,
            applicationReason,
          })
        );
      }

      return next();
    } catch (error) {
      return res.redirect('/error');
    }
  },
};
