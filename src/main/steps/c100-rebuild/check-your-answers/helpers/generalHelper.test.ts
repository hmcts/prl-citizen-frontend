import { HTML } from '../common/htmlSelectors';

import { nameAndGenderParser } from './generalHelper';

describe('nameAndGenderParser test case', () => {
  const keys = {
    dontKnow: "Don't know",
    details: 'Enter details',
    otherGender: 'Other Gender',
  };
  const language = 'en';
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
    const data = nameAndGenderParser(personalDetails, keys, HTML, language);
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
    const data = nameAndGenderParser(personalDetails, keys, HTML, language);
    expect(data).toEqual({
      changeNameInformation:
        '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">Enter details</dt></div><br><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">undefined</dd></div></dl>',
      childGender: 'Male',
    });
  });
});
