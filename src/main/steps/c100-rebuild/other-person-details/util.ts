/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { C100RebuildPartyDetails, Gender, YesNoDontKnow, YesNoEmpty } from '../../../app/case/definition';

export const getDataShape = (): C100RebuildPartyDetails => ({
  id: uuidv4(),
  firstName: '',
  lastName: '',
  personalDetails: {
    dateOfBirth: {
      day: '',
      month: '',
      year: '',
    },
    isDateOfBirthUnknown: YesNoEmpty.EMPTY,
    isNameChanged: YesNoDontKnow.empty,
    previousFullName: '',
    approxDateOfBirth: {
      day: '',
      month: '',
      year: '',
    },
    gender: Gender.EMPTY,
    otherGenderDetails: '',
  },
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
  context: 'personalDetails',
  formData: Record<string, any>
): Partial<C100RebuildPartyDetails> => {
  const dataShape = getDataShape()[context];

  return Object.entries(dataShape).reduce(
    (transformedData: Partial<C100RebuildPartyDetails>, [fieldName, defaultValue]) => {
      if (fieldName in formData && !(fieldName in transformedData)) {
        if (
          (fieldName === 'approxDateOfBirth' && formData.isDateOfBirthUnknown !== YesNoEmpty.YES) ||
          (fieldName === 'otherGenderDetails' && formData.gender !== Gender.OTHER)
        ) {
          formData[fieldName] = defaultValue;
        }
        transformedData[fieldName] = formData[fieldName] ?? dataShape[fieldName];
      }

      return transformedData;
    },
    {}
  );
};
