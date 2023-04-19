import { CaseDate, CaseWithId } from '../../../app/case/case';
import { Consent, Respondent, YesOrNo } from '../../../app/case/definition';
import { toApiDate } from '../../../app/case/to-api-format';

export const prepareRequest = (req: CaseWithId): Consent => {
  const { doYouConsent, courtPermission, reasonForNotConsenting, courtOrderDetails, applicationReceivedDate } = req;

  const request: Consent = {};

  Object.assign(request, {
    consentToTheApplication: doYouConsent,
    permissionFromCourt: courtPermission,
    noConsentReason: reasonForNotConsenting,
    courtOrderDetails,
    applicationReceivedDate: toApiDate(applicationReceivedDate),
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

  const { consentToTheApplication, permissionFromCourt, noConsentReason, courtOrderDetails, applicationReceivedDate } =
    respondent?.value?.response?.consent ?? {};

  Object.assign(consentToApplicationDetails, {
    doYouConsent: consentToTheApplication,
    courtPermission: permissionFromCourt,
    reasonForNotConsenting: noConsentReason,
    courtOrderDetails,
    applicationReceivedDate: toApiDate(applicationReceivedDate as unknown as CaseDate),
  });

  return consentToApplicationDetails;
};
