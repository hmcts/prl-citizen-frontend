import { ConfidentialityList, KeepDetailsPrivate, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setKeepYourDetailsPrivate = (respondent: Respondent, req: AppRequest): Respondent => {
  let keepDetailsPrivate: KeepDetailsPrivate;
  const confidentialityList: ConfidentialityList[] = [];

  if (req.session.userCase.startAlternative === YesOrNo.YES && req?.session?.userCase?.contactDetailsPrivate) {
    req.session.userCase.contactDetailsPrivate.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });

    console.log(confidentialityList);
  }

  if (respondent?.value?.response && respondent?.value?.response?.keepDetailsPrivate) {
    keepDetailsPrivate = respondent?.value?.response?.keepDetailsPrivate;
    keepDetailsPrivate.otherPeopleKnowYourContactDetails = req.session.userCase.detailsKnown!;
    keepDetailsPrivate.confidentiality = req.session.userCase.startAlternative!;
    keepDetailsPrivate.confidentialityList = confidentialityList;
  } else {
    respondent.value.response = {
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: req.session.userCase.detailsKnown!,
        confidentiality: req.session.userCase.startAlternative!,
        confidentialityList,
      },
    };
  }
  return respondent;
};

// export const getConsentDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
//   if (respondent?.value?.response?.consent?.consentToTheApplication === YesOrNo.NO) {
//     req.session.userCase.doYouConsent = YesOrNo.NO;
//     req.session.userCase.reasonForNotConsenting = respondent?.value?.response?.consent.noConsentReason;
//   } else {
//     req.session.userCase.doYouConsent = YesOrNo.YES;
//     req.session.userCase.reasonForNotConsenting = '';
//   }
//   if (respondent?.value?.response?.consent?.permissionFromCourt === YesOrNo.NO) {
//     req.session.userCase.courtPermission = YesOrNo.NO;
//     req.session.userCase.courtOrderDetails = '';
//   } else {
//     req.session.userCase.courtPermission = YesOrNo.YES;
//     req.session.userCase.courtOrderDetails = respondent?.value?.response?.consent?.courtOrderDetails;
//   }
//   req.session.userCase.applicationReceivedDate = fromApiDate(
//     respondent?.value?.response?.consent?.applicationReceivedDate
//   );

//   return req.session.userCase;
// };
