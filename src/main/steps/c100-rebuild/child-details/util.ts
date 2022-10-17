/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { ChildrenDetails, Gender, YesNoEmpty } from '../../../app/case/definition';

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
    sex: Gender.EMPTY,
  },
  childMatters: {
    needsResolution: [],
  },
  parentialResponsibility: {
    statement: '',
  },
});

export const getChildDetails = (children: ChildrenDetails[] | [], childId: string): ChildrenDetails | undefined =>
  children.find(child => child.id === childId);

export const updateChildDetails = (children: ChildrenDetails[], childDetails: ChildrenDetails): ChildrenDetails[] =>
  children.map(child => (child.id === childDetails.id ? childDetails : child));

export const transformFormData = (
  context: 'personalDetails' | 'childMatters' | 'parentialResponsibility',
  formData: Record<string, any>
): Partial<ChildrenDetails> => {
  const dataShape = getDataShape()[context];

  return Object.entries(dataShape).reduce((transformedData: Partial<ChildrenDetails>, [fieldName, defaultValue]) => {
    if (fieldName in formData && !(fieldName in transformedData)) {
      if (fieldName === 'approxDateOfBirth' && formData.isDateOfBirthUnknown !== YesNoEmpty.YES) {
        formData[fieldName] = defaultValue;
      }
      transformedData[fieldName] = formData[fieldName] ?? dataShape[fieldName];
    }

    return transformedData;
  }, {});
};
