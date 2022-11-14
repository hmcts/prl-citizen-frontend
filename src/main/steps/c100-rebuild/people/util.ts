/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import {
  C100RebuildPartyDetails,
  ChildrenDetails,
  Gender,
  OtherChildrenDetails,
  PartyType,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';

type People = ChildrenDetails | OtherChildrenDetails | C100RebuildPartyDetails;

export enum PartyDetailsVariant {
  PERSONAL_DETAILS = 'personalDetails',
  CHILD_MATTERS = 'childMatters',
  PARENTAL_RESPONSIBILITY = 'parentialResponsibility',
  ADDRESS = 'address',
}

export const getDataShape = (context: PartyType): People => {
  const shape = {
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
  };

  if (context === PartyType.CHILDREN) {
    Object.assign(shape, {
      childMatters: {
        needsResolution: [],
      },
      parentialResponsibility: {
        statement: '',
      },
      liveWith: [],
    });
  } else if (context === PartyType.RESPONDENT || context === PartyType.OTHER_PERSON) {
    Object.assign(shape, {
      personalDetails: {
        ...shape.personalDetails,
        hasNameChanged: YesNoDontKnow.empty,
        previousFullName: '',
        respondentPlaceOfBirth: '',
        respondentPlaceOfBirthUnknown: YesOrNo.NO,
      },
      address: {
        AddressLine1: '',
        AddressLine2: '',
        PostTown: '',
        County: '',
        PostCode: '',
        Country: 'United Kingdom',
        selectedAddress: 0,
        addressHistory: YesNoDontKnow.yes,
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
  }

  return shape;
};

export const getPartyDetails = (people: People[] = [], id: string): People | null =>
  people.find(person => person.id === id) ?? null;

export const updatePartyDetails = (people: People[] = [], personDetails: People): People[] | [] =>
  people.map(person => (person.id === personDetails.id ? personDetails : person));

export const getNextPerson = (people: People[], currentPersonId: string): People | null => {
  const index = people.findIndex(person => person.id === currentPersonId);
  return index >= 0 && index < people.length - 1 ? people[index + 1] : null;
};

export const transformAddPeople = (
  context: PartyType,
  formData: Record<string, any>,
  orginialData: People[] = []
): People[] => {
  return Object.entries(formData).reduce(
    (transformedData: People[], [fieldName, value]) => {
      const [fieldId, fieldIndex] = fieldName.split('-');
      const index = Number(fieldIndex) - 1;

      if (!transformedData[index]) {
        transformedData[index] = getDataShape(context);
      }

      if (fieldId in transformedData[index]) {
        transformedData[index][fieldId] = value;
      }

      return transformedData;
    },
    [...orginialData]
  );
};

export const transformPartyDetails = (
  context: PartyType,
  variant: PartyDetailsVariant,
  formData: Record<string, any>
): Partial<People> => {
  const dataShape = getDataShape(context)[variant];

  return Object.entries(dataShape).reduce((transformedData: Partial<People>, [fieldName, defaultValue]) => {
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
  }, {});
};
