/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { ChildrenDetails, Gender, OtherChildrenDetails, YesNoEmpty } from '../../../app/case/definition';

export const getDataShape = (): ChildrenDetails => ({
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
  childMatters: {
    needsResolution: [],
  },
  parentialResponsibility: {
    statement: '',
  },
});

export const getOtherChildDataShape = (): OtherChildrenDetails => ({
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
});

export const getChildDetails = (children: ChildrenDetails[] | [], childId: string): ChildrenDetails | undefined =>
  children.find(child => child.id === childId);

export const getOtherChildDetails = (
  children: OtherChildrenDetails[] | [],
  childId: string
): OtherChildrenDetails | undefined => children.find(child => child.id === childId);

export const updateChildDetails = (children: ChildrenDetails[], childDetails: ChildrenDetails): ChildrenDetails[] =>
  children.map(child => (child.id === childDetails.id ? childDetails : child));

export const updateOtherChildDetails = (
  children: OtherChildrenDetails[],
  childDetails: OtherChildrenDetails
): OtherChildrenDetails[] => children.map(child => (child.id === childDetails.id ? childDetails : child));

export const transformFormData = (
  context: 'personalDetails' | 'childMatters' | 'parentialResponsibility',
  formData: Record<string, any>
): Partial<ChildrenDetails> => {
  const dataShape = getDataShape()[context];

  return Object.entries(dataShape).reduce((transformedData: Partial<ChildrenDetails>, [fieldName, defaultValue]) => {
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

export const transformOtherChildFormData = (
  context: 'personalDetails',
  formData: Record<string, any>
): Partial<OtherChildrenDetails> => {
  const dataShape = getOtherChildDataShape()[context];

  return Object.entries(dataShape).reduce(
    (transformedData: Partial<OtherChildrenDetails>, [fieldName, defaultValue]) => {
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

export const getNextChild = (
  children: OtherChildrenDetails[] | ChildrenDetails[] | [],
  childId: string
): OtherChildrenDetails | ChildrenDetails | null => {
  const childIndex = children.findIndex(child => child.id === childId);
  return childIndex >= 0 && childIndex < children.length - 1 ? children[childIndex + 1] : null;
};
