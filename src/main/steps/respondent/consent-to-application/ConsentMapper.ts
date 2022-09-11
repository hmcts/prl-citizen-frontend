import { CaseWithId } from '../../../app/case/case';
import { Consent, Respondent, YesOrNo } from '../../../app/case/definition';
import { fromApiDate } from '../../../app/case/from-api-format';
import { toApiDate } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setConsentDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  let consentFromResponsent: Consent;
  if (respondent?.value?.response && respondent?.value?.response?.consent) {
    consentFromResponsent = respondent?.value?.response?.consent;
    consentFromResponsent.consentToTheApplication = req.session.userCase.doYouConsent;
    consentFromResponsent.noConsentReason = req.session.userCase.reasonForNotConsenting;
    consentFromResponsent.applicationReceivedDate = toApiDate(req.session.userCase.applicationReceivedDate);
    consentFromResponsent.permissionFromCourt = req.session.userCase.courtPermission;
    consentFromResponsent.courtOrderDetails = req.session.userCase.courtOrderDetails;
    respondent.value.response.consent = consentFromResponsent;
  } else {
    respondent.value.response = {
      consent: {
        consentToTheApplication: req.session.userCase.doYouConsent,
        noConsentReason: req.session.userCase.reasonForNotConsenting,
        applicationReceivedDate: toApiDate(req.session.userCase.applicationReceivedDate),
        permissionFromCourt: req.session.userCase.courtPermission,
        courtOrderDetails: req.session.userCase.courtOrderDetails,
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
  }
  if (respondent?.value?.response?.consent?.permissionFromCourt === YesOrNo.NO) {
    req.session.userCase.courtPermission = YesOrNo.NO;
  } else {
    req.session.userCase.courtPermission = YesOrNo.YES;
    req.session.userCase.courtOrderDetails = respondent?.value?.response?.consent?.courtOrderDetails;
  }
  req.session.userCase.applicationReceivedDate = fromApiDate(
    respondent?.value?.response?.consent?.applicationReceivedDate
  );

  return req.session.userCase;
};
