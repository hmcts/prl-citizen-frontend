import { HTML } from '../common/htmlSelectors';

import { nameAndGenderParser } from './generalHelper';

describe('nameAndGenderParser test case', () => {
  const keys = {
    dontKnow: "Don't know",
    details: 'Enter details',
    otherGender: 'Other Gender',
  };
  test('nameAndGenderParser functionality testing with changed name as Dont know', () => {
    const personalDetails = {
      dateOfBirth: {
        year: '',
        month: '',
        day: '',
      },
      isDateOfBirthUnknown: 'Yes',
      approxDateOfBirth: {
        year: '1999',
        month: '09',
        day: '09',
      },
      gender: 'Male',
      otherGenderDetails: '',
      hasNameChanged: 'dontKnow',
    };
    const data = nameAndGenderParser(personalDetails, keys, HTML);
    expect(data).toEqual({ changeNameInformation: "Don't know", childGender: 'Male' });
  });

  test('nameAndGenderParser functionality testing with changed name as yes', () => {
    const personalDetails = {
      dateOfBirth: {
        year: '',
        month: '',
        day: '',
      },
      isDateOfBirthUnknown: 'Yes',
      approxDateOfBirth: {
        year: '1999',
        month: '09',
        day: '09',
      },
      gender: 'Male',
      otherGenderDetails: '',
      hasNameChanged: 'yes',
    };
    const data = nameAndGenderParser(personalDetails, keys, HTML);
    expect(data).toEqual({
      changeNameInformation:
        'yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>Enter details</h4><div class="govuk-!-padding-bottom-3">undefined</div>',
      childGender: 'Male',
    });
  });
});
