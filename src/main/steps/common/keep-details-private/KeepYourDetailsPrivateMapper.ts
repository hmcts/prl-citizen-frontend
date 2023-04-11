/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../app/case/case';
import { ConfidentialityList, PartyDetails, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const prepareKeepDetailsPrivateRequest = (req: AppRequest): Partial<PartyDetails> => {
  const { startAlternative, contactDetailsPrivate, detailsKnown } = req.session.userCase;
  const request: Partial<PartyDetails> = {};

  const confidentialityList: ConfidentialityList[] = [];

  if (startAlternative === YesOrNo.YES && contactDetailsPrivate) {
    contactDetailsPrivate.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
  }

  Object.assign(request, {
    response: {
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: detailsKnown,
        confidentiality: startAlternative,
        confidentialityList,
      },
    },
  });

  if (startAlternative === YesOrNo.NO) {
    delete request.response?.keepDetailsPrivate?.confidentialityList;
  }

  return request;
};

export const mapKeepYourDetailsPrivate = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const privateDetails = {};
  const { keepDetailsPrivate } = partyDetails.response ?? {};

  let confidentialityList: string[] | undefined = [];
  if (keepDetailsPrivate?.confidentiality === YesOrNo.YES && keepDetailsPrivate.confidentialityList) {
    keepDetailsPrivate.confidentialityList.forEach(element => {
      confidentialityList?.push(ConfidentialityList[element]);
    });
  }

  if (confidentialityList.length === 0) {
    confidentialityList = undefined;
  }

  Object.assign(privateDetails, {
    detailsKnown: keepDetailsPrivate?.otherPeopleKnowYourContactDetails,
    startAlternative: keepDetailsPrivate?.confidentiality,
    contactDetailsPrivate: confidentialityList,
  });

  return privateDetails;
};

export const mapConfidentialListToFields = (partyDetails: Partial<PartyDetails>) => {
  const request: Partial<PartyDetails> = {};
  const { confidentialityList } = partyDetails.response?.keepDetailsPrivate ?? {};

  const address = confidentailYesOrNo(confidentialityList as string[], ConfidentialityList.address);
  const phoneNumber = confidentailYesOrNo(confidentialityList as string[], ConfidentialityList.phoneNumber);
  const email = confidentailYesOrNo(confidentialityList as string[], ConfidentialityList.email);

  Object.assign(request, {
    isAddressConfidential: address,
    isPhoneNumberConfidential: phoneNumber,
    isEmailAddressConfidential: email,
  });

  return request;
};

export const confidentailYesOrNo = (list: string[], field: string): YesOrNo => {
  return list.includes(field) ? YesOrNo.YES : YesOrNo.NO;
};
