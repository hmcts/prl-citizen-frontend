/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../app/case/case';
import { ConfidentialityList, KeepDetailsPrivate, PartyDetails, YesOrNo } from '../../../app/case/definition';

export const prepareKeepDetailsPrivateRequest = (req: CaseWithId): KeepDetailsPrivate => {
  const { startAlternative, contactDetailsPrivate, detailsKnown } = req;
  const request: KeepDetailsPrivate = {};

  const confidentialityList: ConfidentialityList[] = [];

  if (startAlternative === YesOrNo.YES && contactDetailsPrivate) {
    contactDetailsPrivate.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
  }

  Object.assign(request, {
    otherPeopleKnowYourContactDetails: detailsKnown,
    confidentiality: startAlternative,
    confidentialityList,
  });

  if (startAlternative === YesOrNo.NO) {
    delete request?.confidentialityList;
  }

  return request;
};

export const mapKeepYourDetailsPrivate = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const privateDetails = {};
  const { keepDetailsPrivate } = partyDetails.response ?? {};

  const confidentialityList: string[] = [];
  if (keepDetailsPrivate?.confidentiality === YesOrNo.YES && keepDetailsPrivate.confidentialityList) {
    keepDetailsPrivate.confidentialityList.forEach(element => {
      confidentialityList?.push(ConfidentialityList[element]);
    });
  }

  Object.assign(privateDetails, {
    detailsKnown: keepDetailsPrivate?.otherPeopleKnowYourContactDetails,
    startAlternative: keepDetailsPrivate?.confidentiality,
    contactDetailsPrivate: confidentialityList,
  });

  return privateDetails;
};

export const mapConfidentialListToFields = (details: KeepDetailsPrivate) => {
  const request: Partial<PartyDetails> = {
    isAddressConfidential: YesOrNo.NO,
    isPhoneNumberConfidential: YesOrNo.NO,
    isEmailAddressConfidential: YesOrNo.NO,
  };

  if (details?.confidentialityList) {
    Object.assign(request, {
      isAddressConfidential: confidentailYesOrNo(details.confidentialityList as string[], ConfidentialityList.address),
      isPhoneNumberConfidential: confidentailYesOrNo(
        details.confidentialityList as string[],
        ConfidentialityList.phoneNumber
      ),
      isEmailAddressConfidential: confidentailYesOrNo(
        details.confidentialityList as string[],
        ConfidentialityList.email
      ),
    });
  }

  return request;
};

export const confidentailYesOrNo = (list: string[], field: string): YesOrNo => {
  return list.includes(field) ? YesOrNo.YES : YesOrNo.NO;
};
