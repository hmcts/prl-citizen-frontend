import { NextFunction, Response } from 'express';

import { AWPApplicationReason, AWPApplicationType, CaseType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const language = req.session.lang ?? 'en';
    const applicationType = req.params.applicationType as AWPApplicationType;
    const applicationReason = req.params.applicationReason as AWPApplicationReason;
    const awpDetails = req.session.applicationSettings && req.session.applicationSettings?.awpApplicationDetails;

    if (
      awpDetails?.language === language &&
      awpDetails?.applicationType === applicationType &&
      awpDetails?.applicationReason === applicationReason
    ) {
      return next();
    }

    if (req.session.userCase) {
      const caseTypeOfApplication = req.session.userCase.caseTypeOfApplication as CaseType;
      const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
      const awpApplicationDetails = getApplicationDetails(
        applicationType,
        applicationReason,
        caseTypeOfApplication,
        partyType,
        language,
        req.session.applicationSettings
      );
      if(req.session.userCase.awpFeeDetails?.applicationType!==awpApplicationDetails?.applicationType
        &&req.session.userCase.awpFeeDetails?.applicationType!==awpApplicationDetails?.applicationType){
          delete req.session.userCase?.awp_agreementForRequest
          delete req.session.userCase?.awp_completedForm
          delete req.session.userCase?.awp_need_hwf
          delete req.session.userCase?.awp_have_hwfReference
          delete req.session.userCase?.awp_hwf_referenceNumber
          delete req.session.userCase?.awp_hasSupportingDocuments
          delete req.session.userCase?.awp_supportingDocuments
          delete req.session.userCase?.awp_uploadedApplicationForms
          delete req.session.userCase?.awp_isThereReasonForUrgentRequest
          delete req.session.userCase?.awp_urgentRequestReason
        }

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

      return res.redirect('/error');
    }

    return res.redirect('/error');
  },
};
