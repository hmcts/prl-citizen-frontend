import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Provide details for',
  dobLabel: 'Date of birth',
  dateHint: 'For example, 31 3 2016',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  childSexLabel: 'Sex',
  male: 'Male',
  female: 'Female',
  unspecified: 'Unspecified',
  errors: {
    dateOfBirth: {
      required: 'Enter the date of birth',
      invalidDate: 'Date of birth is not valid',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
      cannotHaveBothApproxAndExact: 'Cannot have a date of birth and also "I dont know their date of birth"',
    },
    approxDateOfBirth: {
      required: 'Enter the approx date of birth',
      invalidDate: 'Approx date of birth is not valid',
      incompleteDay: 'Approx date of birth must include a day',
      incompleteMonth: 'Approx date of birth must include a month',
      incompleteYear: 'Approx date of birth must include a year',
      invalidDateInFuture: 'Approx date of birth must be in the past',
    },
    sex: {
      required: 'Select the sex',
    },
  },
};

const cy = {
  title: 'Provide details for - welsh',
  dobLabel: 'Date of birth - welsh',
  dateHint: 'For example, 31 3 2016 - welsh',
  approxCheckboxLabel: 'I don’t know their date of birth - welsh',
  approxDobLabel: 'Approximate date of birth - welsh',
  childSexLabel: 'Sex - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  unspecified: 'Unspecified - welsh',
  errors: {
    dateOfBirth: {
      required: 'Enter the date of birth - welsh',
      invalidDate: 'Date of birth is not valid - welsh',
      incompleteDay: 'Date of birth must include a day - welsh',
      incompleteMonth: 'Date of birth must include a month - welsh',
      incompleteYear: 'Date of birth must include a year - welsh',
      invalidDateInFuture: 'Date of birth must be in the past - welsh',
      cannotHaveBothApproxAndExact: 'Cannot have a date of birth and also "I dont know their date of birth" - welsh',
    },
    approxDateOfBirth: {
      required: 'Enter the approx date of birth - welsh',
      invalidDate: 'Approx date of birth is not valid - welsh',
      incompleteDay: 'Approx date of birth must include a day - welsh',
      incompleteMonth: 'Approx date of birth must include a month - welsh',
      incompleteYear: 'Approx date of birth must include a year - welsh',
      invalidDateInFuture: 'Approx date of birth must be in the past - welsh',
    },
    sex: {
      required: 'Select the sex - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > personal details', () => {
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    const { errors } = generateFormFields(getDataShape().personalDetails);
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} Bob Silly`,
        errors: {
          ...en.errors,
          ...errors.en,
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    const { errors } = generateFormFields(getDataShape().personalDetails);
    languageAssertions(
      'cy',
      {
        ...cy,
        title: `${cy.title} Bob Silly`,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain personal details form fields', () => {
    const { dateOfBirth, isDateOfBirthUnknown, sex } = fields as Record<string, FormFields>;

    expect(dateOfBirth.type).toBe('date');
    expect(dateOfBirth.classes).toBe('govuk-date-input');
    expect((dateOfBirth.hint as Function)(generatedContent)).toBe(en.dateHint);
    expect((dateOfBirth.label as Function)(generatedContent)).toBe(en.dobLabel);
    (dateOfBirth.validator as Validator)(commonContent.userCase!.cd_children![0].personalDetails.dateOfBirth);
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
    expect(isDateInputInvalid).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
    expect(isFutureDate).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });

    expect(isDateOfBirthUnknown.type).toBe('checkboxes');
    expect(isDateOfBirthUnknown.values[0].name).toBe('isDateOfBirthUnknown');
    expect((isDateOfBirthUnknown.values[0].label as Function)(generatedContent)).toBe(en.approxCheckboxLabel);
    expect(isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.type).toBe('date');
    expect(isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.classes).toBe('govuk-date-input');
    expect((isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.label as Function)(generatedContent)).toBe(
      en.approxDobLabel
    );
    (isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.validator as Validator)(
      commonContent.userCase!.cd_children![0].personalDetails.dateOfBirth
    );
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
    expect(isDateInputInvalid).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
    expect(isFutureDate).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });

    expect(sex.type).toBe('radios');
    expect(sex.classes).toBe('govuk-radios');
    expect((sex.label as Function)(generatedContent)).toBe(en.childSexLabel);
    expect((sex.values[0].label as Function)(generatedContent)).toBe(en.female);
    expect(sex.values[0].value).toBe('Female');
    expect((sex.values[1].label as Function)(generatedContent)).toBe(en.male);
    expect(sex.values[1].value).toBe('Male');
    expect((sex.values[2].label as Function)(generatedContent)).toBe(en.unspecified);
    expect(sex.values[2].value).toBe('Unspecified');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
