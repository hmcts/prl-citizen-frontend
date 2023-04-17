import { CaseWithId } from '../../../app/case/case';
import { Consent, Respondent, YesOrNo } from '../../../app/case/definition';

export const prepareRequest = (req: CaseWithId): Consent => {
  const { doYouConsent, courtPermission, reasonForNotConsenting, courtOrderDetails } = req;

  const request: Consent = {};

  Object.assign(request, {
    consentToTheApplication: doYouConsent,
    permissionFromCourt: courtPermission,
    noConsentReason: reasonForNotConsenting,
    courtOrderDetails,
  });

  // data cleanup
  if (doYouConsent === YesOrNo.YES) {
    delete request.noConsentReason;
  }

  if (courtPermission === YesOrNo.NO) {
    delete request.courtOrderDetails;
  }

  return request;
};

export const mapConsentToApplicationDetails = (respondent: Respondent): Partial<CaseWithId> => {
  const consentToApplicationDetails = {};

  const { consentToTheApplication, permissionFromCourt, noConsentReason, courtOrderDetails } =
    respondent?.value?.response?.consent ?? {};

  Object.assign(consentToApplicationDetails, {
    doYouConsent: consentToTheApplication,
    courtPermission: permissionFromCourt,
    reasonForNotConsenting: noConsentReason,
    courtOrderDetails,
  });

  return consentToApplicationDetails;
};
