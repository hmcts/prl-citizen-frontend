import { NextFunction, Response } from 'express';

import { caseApi } from '../../../app/case/CaseApi';
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
    const { removeId } = req.query;

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

      let documentToDelete;
      if (req.session.userCase.awp_uploadedApplicationForms) {
        documentToDelete = req.session.userCase.awp_uploadedApplicationForms.find(
          document => document.url.split('/')[document.url.split('/').length - 1] === removeId
        );
      }

      if (removeId && documentToDelete) {
        try {
          const userDetails = req?.session?.user;
          caseApi(userDetails, req.locals.logger).deleteDocument(removeId.toString());
        } catch (error) {
          res.json(error);
        }
        req.session.userCase.awp_uploadedApplicationForms = req.session.userCase?.awp_uploadedApplicationForms?.filter(
          application => application.url.split('/')[application.url.split('/').length - 1] !== removeId
        );
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
