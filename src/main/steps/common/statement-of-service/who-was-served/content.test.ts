/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked, isFutureDate } from '../../../../app/form/validation';
import { CommonContent } from '../../common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Statement of service',
  whoWasServedLabel: 'Who was served?',
  servedDateLabel: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  errors: {
    sos_partiesServed: {
      required: 'You must select a respondent',
    },
    sos_partiesServedDate: {
      required: 'You must enter the date of service',
      invalidDate: 'Date of service is not valid',
      incompleteDay: 'Date of service must include a day',
      incompleteMonth: 'Date of service must include a month',
      incompleteYear: 'Date of service must include a year',
      invalidDateInFuture: 'Date of service must be in the past',
    },
  },
};

const cy: typeof en = {
  title: 'datganiad cyflwyno',
  whoWasServedLabel: 'Ar bwy y cyflwynwyd?',
  servedDateLabel: 'Pryd cawson nhw eu cyflwyno?',
  servedDateHint: 'Er enghraifft: 16 4 2021',
  errors: {
    sos_partiesServed: {
      required: 'Mae’n rhaid i chi ddewis atebydd',
    },
    sos_partiesServedDate: {
      required: 'Mae’n rhaid i chi nodi’r dyddiad cyflwyno',
      invalidDate: 'Date of service is not valid - welsh',
      incompleteDay: 'Date of service must include a day - welsh',
      incompleteMonth: 'Date of service must include a month - welsh',
      incompleteYear: 'Date of service must include a year - welsh',
      invalidDateInFuture: 'Date of service must be in the past - welsh',
    },
  },
};

describe('statement-of-service > who-was-served > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      respondents: [
        {
          id: '123',
          value: {
            firstName: 'first',
            lastName: 'respondent',
            user: {
              idamId: '123',
            },
          },
        },
      ],
    },
  } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('form should contain correct fields', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const sos_partiesServedField = fields.sos_partiesServed as FormOptions;

    expect(sos_partiesServedField.type).toBe('checkboxes');
    expect((sos_partiesServedField.label as Function)(generatedContent)).toBe(en.whoWasServedLabel);
    expect(sos_partiesServedField.validator).toBe(atLeastOneFieldIsChecked);
    expect(sos_partiesServedField.values[0].label).toBe('first respondent');
    expect(sos_partiesServedField.values[0].value).toBe('123');
    expect(sos_partiesServedField.values[0].selected).toBe(true);

    const sos_partiesServedDateField = fields.sos_partiesServedDate as FormOptions;
    expect(sos_partiesServedDateField.type).toBe('date');
    expect((sos_partiesServedDateField.label as Function)(generatedContent)).toBe(en.servedDateLabel);
    expect((sos_partiesServedDateField.hint as Function)(generatedContent)).toBe(en.servedDateHint);

    expect(sos_partiesServedDateField.values[0].name).toBe('day');
    expect(
      (sos_partiesServedDateField.values[0].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Day');
    expect(sos_partiesServedDateField.values[0].classes).toBe('govuk-input--width-2');

    expect(sos_partiesServedDateField.values[1].name).toBe('month');
    expect(
      (sos_partiesServedDateField.values[1].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Month');
    expect(sos_partiesServedDateField.values[1].classes).toBe('govuk-input--width-2');

    expect(sos_partiesServedDateField.values[2].name).toBe('year');
    expect(
      (sos_partiesServedDateField.values[2].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Year');
    expect(sos_partiesServedDateField.values[2].classes).toBe('govuk-input--width-4');

    (sos_partiesServedDateField.validator as Validator)({
      day: '09',
      month: '09',
      year: '1999',
    });
    expect(isFutureDate).toHaveBeenCalledWith({ day: '09', month: '09', year: '1999' });
  });

  test('form should contain correct fields for multiple respondents', () => {
    const generatedContent = generateContent({
      language: 'en',
      userCase: {
        sos_partiesServed: ['123'],
        respondents: [
          {
            id: '123',
            value: {
              firstName: 'first',
              lastName: 'respondent',
              user: {
                idamId: '123',
              },
            },
          },
          {
            id: '1234',
            value: {
              firstName: 'second',
              lastName: 'respondent',
              user: {
                idamId: '1234',
              },
            },
          },
        ],
      },
    } as unknown as CommonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const sos_partiesServedField = fields.sos_partiesServed as FormOptions;

    expect(sos_partiesServedField.type).toBe('checkboxes');
    expect((sos_partiesServedField.label as Function)(generatedContent)).toBe(en.whoWasServedLabel);
    expect(sos_partiesServedField.validator).toBe(atLeastOneFieldIsChecked);
    expect(sos_partiesServedField.values).toHaveLength(2);

    expect(sos_partiesServedField.values[0].label).toBe('first respondent');
    expect(sos_partiesServedField.values[0].value).toBe('123');
    expect(sos_partiesServedField.values[0].selected).toBe(true);
    expect(sos_partiesServedField.values[1].label).toBe('second respondent');
    expect(sos_partiesServedField.values[1].value).toBe('1234');
    expect(sos_partiesServedField.values[1].selected).toBe(false);
  });

  test('should contain onlyContinue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form?.onlyContinue?.text as Function)(generatedContent)).toBe(commonContent.onlyContinue);
  });
});
