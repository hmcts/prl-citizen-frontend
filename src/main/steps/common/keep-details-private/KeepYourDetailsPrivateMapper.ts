import { CaseWithId } from '../../../app/case/case';
import { ConfidentialityList, KeepDetailsPrivate, PartyDetails, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setKeepYourDetailsPrivate = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  let keepDetailsPrivate: KeepDetailsPrivate;
  const confidentialityList: ConfidentialityList[] = [];

  if (req.session.userCase.startAlternative === YesOrNo.YES && req?.session?.userCase?.contactDetailsPrivate) {
    req.session.userCase.contactDetailsPrivate.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
  }

  if (partyDetails.response && partyDetails.response?.keepDetailsPrivate) {
    keepDetailsPrivate = partyDetails.response?.keepDetailsPrivate;
    keepDetailsPrivate.otherPeopleKnowYourContactDetails = req.session.userCase.detailsKnown!;
    keepDetailsPrivate.confidentiality = req.session.userCase.startAlternative!;
    keepDetailsPrivate.confidentialityList = confidentialityList;
  } else {
    partyDetails.response = {
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: req.session.userCase.detailsKnown!,
        confidentiality: req.session.userCase.startAlternative!,
        confidentialityList,
      },
    };
  }
  return partyDetails;
};

export const getKeepYourDetailsPrivate = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  req.session.userCase.detailsKnown = partyDetails.response.keepDetailsPrivate?.otherPeopleKnowYourContactDetails;
  req.session.userCase.startAlternative = partyDetails.response.keepDetailsPrivate?.confidentiality;
  const confidentialityList: string[] = [];
  if (
    partyDetails.response.keepDetailsPrivate?.confidentiality === YesOrNo.YES &&
    partyDetails.response.keepDetailsPrivate.confidentialityList
  ) {
    partyDetails.response.keepDetailsPrivate.confidentialityList.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
    req.session.userCase.contactDetailsPrivate = confidentialityList;
  }

  return req.session.userCase;
};
