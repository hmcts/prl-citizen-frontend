/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { C100RebuildPartyDetails, Gender, YesNoEmpty, YesOrNo } from '../../../app/case/definition';

export const getDataShape = (): C100RebuildPartyDetails => ({
  id: uuidv4(),
  firstName: '',
  lastName: '',
  personalDetails: {
    repondentDetials: YesNoEmpty.EMPTY,
    resPreviousName: '',
    dateOfBirth: {
      day: '',
      month: '',
      year: '',
    },
    isDateOfBirthUnknown: YesNoEmpty.EMPTY,
    approxDateOfBirth: {
      day: '',
      month: '',
      year: '',
    },
    gender: Gender.EMPTY,
    otherGenderDetails: '',
    respondentPlaceOfBirth: '',
    respondentPlaceOfBirthUnknown: YesOrNo.NO,
  },
  address: {
    AddressLine1: '',
    AddressLine2: '',
    PostTown: '',
    County: '',
    PostCode: '',
    selectedAddress: 2,
    addressHistory: YesOrNo.YES,
    provideDetailsOfPreviousAddresses: '',
  },
  relationshipDetails: {
    relationshipToChildren: [],
  },
  contactDetails: {
    donKnowEmailAddress: YesOrNo.NO,
    emailAddress: '',
    telephoneNumber: '',
    donKnowTelephoneNumber: YesOrNo.NO,
  },
  addressUnknown: YesOrNo.NO,
});

export const getOtherPersonDetails = (
  otherPersons: C100RebuildPartyDetails[] | [],
  otherPersonId: string
): C100RebuildPartyDetails | undefined => otherPersons.find(otherPerson => otherPerson.id === otherPersonId);

export const updateOtherPersonDetails = (
  otherPersons: C100RebuildPartyDetails[],
  otherPersonDetails: C100RebuildPartyDetails
): C100RebuildPartyDetails[] =>
  otherPersons.map(otherPerson => (otherPerson.id === otherPersonDetails.id ? otherPersonDetails : otherPerson));

export const transformFormData = (
  context: 'personalDetails' | 'address',
  formData: Record<string, any>
): Partial<C100RebuildPartyDetails> => {
  const dataShape = getDataShape()[context];

  return Object.entries(dataShape!).reduce(
    (transformedData: Partial<C100RebuildPartyDetails>, [fieldName, defaultValue]) => {
      if (fieldName in formData && !(fieldName in transformedData)) {
        if (
          (fieldName === 'approxDateOfBirth' && formData.isDateOfBirthUnknown !== YesNoEmpty.YES) ||
          (fieldName === 'otherGenderDetails' && formData.gender !== Gender.OTHER)
        ) {
          formData[fieldName] = defaultValue;
        }
        transformedData[fieldName] = formData[fieldName] ?? dataShape![fieldName];
      }

      return transformedData;
    },
    {}
  );
};
