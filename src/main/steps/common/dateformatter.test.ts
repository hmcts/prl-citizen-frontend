import { C100_CYA_DATE_FORMATTOR, DATE_FORMATTOR } from './dateformatter';

const DateObject = {
  year: 2018,
  month: 10,
  day: 15,
};
const language = 'en';
const newDate = DATE_FORMATTOR(DateObject, language);

describe('test cases for date formatter', () => {
  test('should run the test and parse date successfully', () => {
    expect(newDate).toBe('15 October 2018');
  });

  test('should run the test and shouldn"t parse date successfully', () => {
    const newDateObject = {
      year: '',
      month: 10,
      day: 15,
    };
    expect(DATE_FORMATTOR(newDateObject, language)).toEqual('10/15');
  });
});
describe('test cases for C100_CYA_DATE_FORMATTOR', () => {
  test('should run the test and parse date successfully', () => {
    expect(C100_CYA_DATE_FORMATTOR(DateObject, language)).toBe('15 October 2018');
    expect(C100_CYA_DATE_FORMATTOR(DateObject, '')).toBe('15 October 2018');
  });

  test('should run the test and should show error text', () => {
    const newDateObject = {
      year: '',
      month: 10,
      day: 15,
    };
    expect(C100_CYA_DATE_FORMATTOR(newDateObject, language)).toEqual(
      '<span class="govuk-error-message">Complete this section</span>'
    );
  });
});
