/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { C100RebuildPartyDetails, ChildrenDetails, Gender, YesNoEmpty } from '../../../app/case/definition';

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
    approxDateOfBirth: {
      day: '',
      month: '',
      year: '',
    },
    gender: Gender.EMPTY,
    otherGenderDetails: '',
  },
  relationshipDetails: {
    relationshipToChildren: [
      {
        relationshipType: '',
        childId: '',
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
