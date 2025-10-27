/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100RebuildPartyDetails,
  ChildrenDetails,
  Gender,
  OtherChildrenDetails,
  PartyType,
  RelationshipType,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export type People = ChildrenDetails | OtherChildrenDetails | C100RebuildPartyDetails | C100Applicant;

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
      mainlyLiveWith: [],
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
        selectedAddress: -1,
        addressHistory: YesNoDontKnow.dontKnow,
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

export const getPartyDetails = (id: string, people: People[] = []): People | null =>
  people.find(person => person.id === id) ?? null;

export const updatePartyDetails = (personDetails: People, people: People[] = []): People[] | [] =>
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
        (fieldName === 'otherGenderDetails' && formData.gender !== Gender.OTHER) ||
        (fieldName === 'provideDetailsOfPreviousAddresses' && formData.addressHistory !== YesNoDontKnow.yes) ||
        (fieldName === 'previousFullName' && formData.hasNameChanged !== YesNoDontKnow.yes) ||
        (fieldName === 'respondentPlaceOfBirth' && formData.respondentPlaceOfBirthUnknown === YesOrNo.YES)
      ) {
        formData[fieldName] = defaultValue;
      }
      transformedData[fieldName] = formData[fieldName] ?? dataShape[fieldName];
    }

    return transformedData;
  }, {});
};

export const dobUnknown = (formData: Record<string, any>): string => {
  console.log('formData.dateOfBirth.day', formData.dateOfBirth.day);
  console.log('formData.dateOfBirth.month', formData.dateOfBirth.month);
  console.log('formData.dateOfBirth.year', formData.dateOfBirth.year);
  const isExactDobDataPresent =
    formData.dateOfBirth.day !== '' || formData.dateOfBirth.month !== '' || formData.dateOfBirth.year !== ''
      ? 'cannotHaveBothApproxAndExact'
      : '';
  console.log('isExactDobDataPresent', isExactDobDataPresent);
  console.log("formData?.isDateOfBirthUnknown", formData?.isDateOfBirthUnknown);
  console.log(formData?.isDateOfBirthUnknown === YesNoEmpty.YES ? isExactDobDataPresent : '');
  return formData?.isDateOfBirthUnknown === YesNoEmpty.YES ? isExactDobDataPresent : '';
};

export const setDynamicFormContext = (req: AppRequest, context: string): void => {
  req.session.applicationSettings = {
    ...req.session.applicationSettings,
    dynamicForm: {
      context,
    },
  };
  setTimeout(() => {
    delete req.session?.applicationSettings?.dynamicForm;
    req.session.save();
  }, 5000);
};

export const cleanLiveWithData = (caseData: CaseWithId, id: string): CaseWithId => {
  caseData?.cd_children?.forEach(child => {
    if (child.mainlyLiveWith?.id === id) {
      delete child.mainlyLiveWith;
    }
    child.liveWith = child.liveWith?.filter(liveWith => liveWith.id !== id);
  });

  return caseData;
};

export const cleanChildRelationshipDetails = (caseData: CaseWithId, id: string): CaseWithId => {
  caseData?.appl_allApplicants?.forEach(applicant => {
    if (applicant.relationshipDetails) {
      applicant.relationshipDetails.relationshipToChildren =
        applicant.relationshipDetails?.relationshipToChildren.filter(relationship => relationship.childId !== id);
    }
  });

  caseData?.resp_Respondents?.forEach(respondent => {
    if (respondent.relationshipDetails) {
      respondent.relationshipDetails.relationshipToChildren =
        respondent.relationshipDetails?.relationshipToChildren.filter(relationship => relationship.childId !== id);
    }
  });

  caseData?.oprs_otherPersons?.forEach(otherPerson => {
    if (otherPerson.relationshipDetails) {
      otherPerson.relationshipDetails.relationshipToChildren =
        otherPerson.relationshipDetails?.relationshipToChildren.filter(relationship => relationship.childId !== id);
    }
  });

  return caseData;
};

export const cleanOtherRelationshipDetails = (
  relationshipType: RelationshipType,
  otherRelationshipTypeDetails: string
): string => {
  return relationshipType !== RelationshipType.OTHER ? '' : otherRelationshipTypeDetails;
};
