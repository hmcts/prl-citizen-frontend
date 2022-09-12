import { CaseWithId } from '../../../app/case/case';
import { Consent, Respondent, YesOrNo } from '../../../app/case/definition';
import { fromApiDate } from '../../../app/case/from-api-format';
import { toApiDate } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setConsentDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  let consentFromResponsent: Consent;
  let reasonForNotConsenting = '';
  let courtOrderDetails = '';
  if (req.session.userCase.doYouConsent === YesOrNo.NO) {
    reasonForNotConsenting = req.session.userCase.reasonForNotConsenting!;
  }
  if (req.session.userCase.courtPermission === YesOrNo.YES) {
    courtOrderDetails = req.session.userCase.courtOrderDetails!;
  }
  if (respondent?.value?.response && respondent?.value?.response?.consent) {
    consentFromResponsent = respondent?.value?.response?.consent;
    consentFromResponsent.consentToTheApplication = req.session.userCase.doYouConsent;
    consentFromResponsent.noConsentReason = reasonForNotConsenting;
    consentFromResponsent.applicationReceivedDate = toApiDate(req.session.userCase.applicationReceivedDate);
    consentFromResponsent.permissionFromCourt = req.session.userCase.courtPermission;
    consentFromResponsent.courtOrderDetails = courtOrderDetails;
    respondent.value.response.consent = consentFromResponsent;
  } else {
    respondent.value.response = {
      consent: {
        consentToTheApplication: req.session.userCase.doYouConsent,
        noConsentReason: reasonForNotConsenting,
        applicationReceivedDate: toApiDate(req.session.userCase.applicationReceivedDate),
        permissionFromCourt: req.session.userCase.courtPermission,
        courtOrderDetails,
      },
    };
  }
  return respondent;
};

export const getConsentDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  if (respondent?.value?.response?.consent?.consentToTheApplication === YesOrNo.NO) {
    req.session.userCase.doYouConsent = YesOrNo.NO;
    req.session.userCase.reasonForNotConsenting = respondent?.value?.response?.consent.noConsentReason;
  } else {
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.reasonForNotConsenting = '';
  }
  if (respondent?.value?.response?.consent?.permissionFromCourt === YesOrNo.NO) {
    req.session.userCase.courtPermission = YesOrNo.NO;
    req.session.userCase.courtOrderDetails = '';
  } else {
    req.session.userCase.courtPermission = YesOrNo.YES;
    req.session.userCase.courtOrderDetails = respondent?.value?.response?.consent?.courtOrderDetails;
  }
  req.session.userCase.applicationReceivedDate = fromApiDate(
    respondent?.value?.response?.consent?.applicationReceivedDate
  );

  return req.session.userCase;
};
