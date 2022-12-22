import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { C100RebuildPartyDetails, PartyType } from '../../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { getDataShape } from '../../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  title: 'Provide details for',
  dobLabel: 'Date of birth',
  dateHint: 'For example, 31 3 2016',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  childGenderLabel: 'Gender',
  male: 'Male',
  female: 'Female',
  other: 'They identify in another way',
  otherGenderDetailsLabel: "Child's gender (Optional)",
  // day: 'Day',
  // month: 'Month',
  // year: 'Year',
  errors: {
    dateOfBirth: {
      required: 'Enter the date of birth',
      invalidDate: 'Date of birth is not valid',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
      cannotHaveBothApproxAndExact: 'Cannot have a date of birth and also "I dont know their date of birth"',
      invalidDateOver18: 'Enter a date of birth under 18 years of age',
    },
    approxDateOfBirth: {
      required: 'Enter the approx date of birth',
      invalidDate: 'Approx date of birth is not valid',
      incompleteDay: 'Approx date of birth must include a day',
      incompleteMonth: 'Approx date of birth must include a month',
      incompleteYear: 'Approx date of birth must include a year',
      invalidDateInFuture: 'Approx date of birth must be in the past',
      invalidDateOver18: 'Enter a date of birth under 18 years of age',
    },
    gender: {
      required: 'Select the gender',
    },
  },
};

const cy = {
  title: 'Darparwch fanylion am',
  dobLabel: 'Dyddiad geni',
  dateHint: 'Er enghraifft, 31 3 2016',
  approxCheckboxLabel: 'Nid wyf yn gwybod beth yw ei (d)dyddiad geni',
  approxDobLabel: 'Dyddiad geni bras',
  childGenderLabel: 'Rhyw',
  male: 'Gwryw',
  female: 'Benyw',
  other: 'Maen nhw’n uniaethu mewn ffordd arall',
  otherGenderDetailsLabel: 'Rhyw y plentyn (Dewisol)',
  // day: 'Diwrnod',
  // month: 'Mis',
  // year: 'Blwyddyn',
  errors: {
    dateOfBirth: {
      required: 'Nodwch ei ddyddiad geni',
      invalidDate: 'Nid yw’r dyddiad geni yn ddilys',
      incompleteDay: 'DRhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni fod yn y gorffennol',
      cannotHaveBothApproxAndExact: 'Methu cael dyddiad geni a hefyd “ nid wyf yn gwybod beth yw ei ddyddiad geni',
      invalidDateOver18: 'Enter a date of birth under 18 years of age - welsh',
    },
    approxDateOfBirth: {
      required: 'Nodwch ddyddiad geni bras',
      invalidDate: 'Nid yw’r dyddiad geni bras yn ddilys',
      incompleteDay: 'Rhaid i’r dyddiad geni bras gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni bras gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni bras gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni bras fod yn y gorffennol',
      invalidDateOver18: 'Enter a date of birth under 18 years of age - welsh',
    },
    gender: {
      required: 'Nodwch y rhywedd',
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
      ocd_otherChildren: [
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
            gender: 'Male',
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
    const { errors } = generateFormFields(
      (getDataShape(PartyType.OTHER_CHILDREN) as C100RebuildPartyDetails).personalDetails
    );
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
    const { errors } = generateFormFields(
      (getDataShape(PartyType.OTHER_CHILDREN) as C100RebuildPartyDetails).personalDetails
    );
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
    const { dateOfBirth, isDateOfBirthUnknown, gender } = fields as Record<string, FormFields>;

    expect(dateOfBirth.type).toBe('date');
    expect(dateOfBirth.classes).toBe('govuk-date-input');
    expect((dateOfBirth.hint as Function)(generatedContent)).toBe(en.dateHint);
    expect((dateOfBirth.label as Function)(generatedContent)).toBe(en.dobLabel);
    (dateOfBirth.validator as Validator)(commonContent.userCase!.ocd_otherChildren![0].personalDetails.dateOfBirth);
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
      commonContent.userCase!.ocd_otherChildren![0].personalDetails.dateOfBirth
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

    expect(gender.type).toBe('radios');
    expect(gender.classes).toBe('govuk-radios');
    expect((gender.label as Function)(generatedContent)).toBe(en.childGenderLabel);
    expect((gender.values[0].label as Function)(generatedContent)).toBe(en.female);
    expect(gender.values[0].value).toBe('Female');
    expect((gender.values[1].label as Function)(generatedContent)).toBe(en.male);
    expect(gender.values[1].value).toBe('Male');
    expect((gender.values[2].label as Function)(generatedContent)).toBe(en.other);
    expect(gender.values[2].value).toBe('Other');
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
