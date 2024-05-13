import { CaseWithId } from '../../../../app/case/case';
import { Consent, PartyDetails, YesOrNo } from '../../../../app/case/definition';
import { fromApiDate } from '../../../../app/case/from-api-format';
import { toApiDate } from '../../../../app/case/to-api-format';

export const prepareConsentRequest = (req: CaseWithId): Consent => {
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

export const mapConsentToApplicationDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const consentToApplicationDetails = {};

  const { consentToTheApplication, permissionFromCourt, noConsentReason, courtOrderDetails, applicationReceivedDate } =
    partyDetails.response?.consent ?? {};

  Object.assign(consentToApplicationDetails, {
    doYouConsent: consentToTheApplication,
    courtPermission: permissionFromCourt,
    reasonForNotConsenting: noConsentReason,
    courtOrderDetails,
    applicationReceivedDate: fromApiDate(applicationReceivedDate),
  });

  return consentToApplicationDetails;
};
