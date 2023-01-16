/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { C100Applicant, Gender, YesNoEmpty } from '../../../app/case/definition';

export const getDataShape = (): C100Applicant => ({
  id: uuidv4(),
  applicantFirstName: '',
  applicantLastName: '',
  personalDetails: {
    haveYouChangeName: YesNoEmpty.EMPTY,
    applPreviousName: '',
    dateOfBirth: {
      day: '',
      month: '',
      year: '',
    },
    gender: Gender.EMPTY,
    otherGenderDetails: '',
    applicantPlaceOfBirth: '',
  },
  applicantContactDetail: {
    applicantContactPreferences: [],
  },
});

export const getApplicantDetails = (
  applicants: C100Applicant[] | [],
  applicantId?: string
): C100Applicant | undefined => applicants.find(applicant => applicant.id === applicantId);

export const updateApplicantDetails = (applicants: C100Applicant[], applicantDetails: C100Applicant): C100Applicant[] =>
  applicants.map(applicant => (applicant.id === applicantDetails.id ? applicantDetails : applicant));

export const transformFormData = (
  context: 'personalDetails' | 'applicantContactDetail',
  formData: Record<string, any>
): Partial<C100Applicant> => {
  const dataShape = getDataShape()[context]!;

  return Object.entries(dataShape).reduce((transformedData: Partial<C100Applicant>, [fieldName, defaultValue]) => {
    if (fieldName in formData && !(fieldName in transformedData)) {
      if (fieldName === 'otherGenderDetails' && formData.gender !== Gender.OTHER) {
        formData[fieldName] = defaultValue;
      }
      if (fieldName === 'haveYouChangeName' && formData.haveYouChangeName !== YesNoEmpty.YES) {
        formData.applPreviousName = defaultValue;
      }
      transformedData[fieldName] = formData[fieldName] ?? dataShape[fieldName];
    }

    return transformedData;
  }, {});
};
