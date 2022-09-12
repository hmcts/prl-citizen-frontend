import { CaseWithId } from '../../../app/case/case';
import { ConfidentialityList, KeepDetailsPrivate, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setKeepYourDetailsPrivate = (respondent: Respondent, req: AppRequest): Respondent => {
  let keepDetailsPrivate: KeepDetailsPrivate;
  const confidentialityList: ConfidentialityList[] = [];

  if (req.session.userCase.startAlternative === YesOrNo.YES && req?.session?.userCase?.contactDetailsPrivate) {
    req.session.userCase.contactDetailsPrivate.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
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

export const getKeepYourDetailsPrivate = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  req.session.userCase.detailsKnown = respondent.value?.response.keepDetailsPrivate?.otherPeopleKnowYourContactDetails;
  req.session.userCase.startAlternative = respondent.value?.response.keepDetailsPrivate?.confidentiality;
  const confidentialityList: string[] = [];
  if (
    respondent.value?.response.keepDetailsPrivate?.confidentiality === YesOrNo.YES &&
    respondent.value.response.keepDetailsPrivate.confidentialityList
  ) {
    respondent.value.response.keepDetailsPrivate.confidentialityList.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
    req.session.userCase.contactDetailsPrivate = confidentialityList;
  }

  return req.session.userCase;
};
