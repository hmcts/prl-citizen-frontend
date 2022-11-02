/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { C100RebuildPartyDetails, ChildrenDetails, Gender, YesNoEmpty, YesOrNo } from '../../../app/case/definition';

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
  relationshipDetails: {
    relationshipToChildren: [
      {
        relationshipType: '',
        childId: '',
        otherRelationshipTypeDetails: '',
      },
    ],
  },
});

export const getRespndentDetails = (
  respondents: C100RebuildPartyDetails[] | [],
  respondentId: string
): C100RebuildPartyDetails | undefined => respondents.find(respondent => respondent.id === respondentId);

export const getChildDetails = (children: ChildrenDetails[] | [], childId: string): ChildrenDetails | undefined =>
  children.find(child => child.id === childId);

export const updateRespondentDetails = (
  respondents: C100RebuildPartyDetails[],
  respondentDetails: C100RebuildPartyDetails
): C100RebuildPartyDetails[] =>
  respondents.map(respondent => (respondent.id === respondentDetails.id ? respondentDetails : respondent));

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
