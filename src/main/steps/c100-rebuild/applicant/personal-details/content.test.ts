import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesNoEmpty } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Provide details for',
  haveYouChangeNameLabel: 'Have you changed your name?',
  haveYouChangeNameHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names',
  one: 'Yes',
  two: 'No',
  applicantPlaceOfBirthLabel: 'Your place of birth',
  applicantPlaceOfBirthHint: 'For example, town or city',
  dontKnowLabel: "Don't know",
  dobLabel: 'Your date of birth',
  dobHint: 'For example, 31 3 2016',
  previousNameLabel: 'Enter your previous name',
  previousNameHint: 'This should be the full legal name(including any middle names)',
  applicantGenderLabel: 'Gender',
  male: 'Male',
  female: 'Female',
  other: 'They identify in another way',
  otherGenderDetailsLabel: "Applicant's gender (Optional)",
  // day: 'Day',
  // month: 'Month',
  // year: 'Year',
  errors: {
    haveYouChangeName: {
      required: 'Select if you’ve changed your name',
    },
    applPreviousName: {
      required: 'Enter your previous name',
    },
    dateOfBirth: {
      required: 'Enter the date of birth',
      invalidDate: 'Date of birth is not valid',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
    },
    gender: {
      required: 'Select the gender',
    },
    applicantPlaceOfBirth: {
      required: 'Enter your place of birth',
    },
  },
};

const cy = {
  title: 'Darparwch fanylion am ',
  haveYouChangeNameLabel: 'A ydych wedi newid eich enw?',
  haveYouChangeNameHint:
    'Er enghraifft, trwy briodas neu fabwysiadu neu drwy weithred newid enw. Mae hyn yn cynnwys enw cyntaf, cyfenw ac unrhyw enwau canol',
  one: 'Do',
  two: 'Naddo',
  applicantPlaceOfBirthLabel: 'Eich man geni',
  applicantPlaceOfBirthHint: 'Er enghraifft, tref neu ddinas',
  dontKnowLabel: 'Ddim yn gwybod',
  dobLabel: 'Eich dyddiad geni',
  dobHint: 'Er enghraifft, 31 3 2016',
  previousNameLabel: 'Nodwch eich enwau blaenorol',
  previousNameHint: 'Dylai hwn fod yr enw cyfreithiol llawn(gan gynnwys unrhyw enwau canol)',
  applicantGenderLabel: 'Rhyw',
  male: 'Benyw',
  female: 'Gwryw',
  other: 'Maen nhw’n uniaethu mewn ffordd arall',
  otherGenderDetailsLabel: "Rhyw'r Ceisydd (Dewisol)",
  // day: 'Diwrnod',
  // month: 'Mis',
  // year: 'Blwyddyn',
  errors: {
    haveYouChangeName: {
      required: 'Dewiswch sut wnaethoch chi newid eich enw',
    },
    applPreviousName: {
      required: 'Nodwch eich enwau blaenorol',
    },
    dateOfBirth: {
      required: 'Nodwch ei ddyddiad geni',
      invalidDate: 'Nid yw’r dyddiad geni yn ddilys ‘,',
      incompleteDay: 'Rhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni fod yn y gorffennol',
    },

    gender: {
      required: 'Nodwch y rhywedd',
    },
    applicantPlaceOfBirth: {
      required: 'Nodwch eich man geni',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Applicant details > personal details', () => {
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          personalDetails: {
            haveYouChangeName: YesNoEmpty.YES,
            applPreviousName: YesNoEmpty.YES,
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            gender: 'Male',
            applicantPlaceOfBirth: '',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
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
        title: `${en.title} dummy Test`,
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
        title: `${cy.title} dummy Test`,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain personal details form fields', () => {
    const { applicantPlaceOfBirth, haveYouChangeName, dateOfBirth, gender } = fields as Record<string, FormFields>;

    expect(haveYouChangeName.type).toBe('radios');
    expect(haveYouChangeName.classes).toBe('govuk-radios');
    expect((haveYouChangeName.label as Function)(generatedContent)).toBe(en.haveYouChangeNameLabel);
    expect((haveYouChangeName.hint as Function)(generatedContent)).toBe(en.haveYouChangeNameHint);
    expect((haveYouChangeName.values[0].label as Function)(generatedContent)).toBe(en.one);

    expect(haveYouChangeName.values[0].subFields.applPreviousName.type).toBe('text');
    expect((haveYouChangeName.values[0].subFields.applPreviousName.hint as Function)(generatedContent)).toBe(
      en.previousNameHint
    );
    expect((haveYouChangeName.values[0].subFields.applPreviousName.label as Function)(generatedContent)).toBe(
      en.previousNameLabel
    );

    expect((haveYouChangeName.values[1].label as Function)(generatedContent)).toBe(en.two);
    expect(dateOfBirth.type).toBe('date');
    expect(dateOfBirth.classes).toBe('govuk-date-input');
    expect((dateOfBirth.label as Function)(generatedContent)).toBe(en.dobLabel);
    (dateOfBirth.validator as Validator)(commonContent.userCase!.appl_allApplicants![0].personalDetails.dateOfBirth);
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
    expect((gender.label as Function)(generatedContent)).toBe(en.applicantGenderLabel);
    expect((gender.values[0].label as Function)(generatedContent)).toBe(en.female);
    expect(gender.values[0].value).toBe('Female');
    expect((gender.values[1].label as Function)(generatedContent)).toBe(en.male);
    expect(gender.values[1].value).toBe('Male');
    expect((gender.values[2].label as Function)(generatedContent)).toBe(en.other);
    expect(gender.values[2].value).toBe('Other');
    expect(gender.values[2].subFields.otherGenderDetails.type).toBe('text');
    expect((gender.values[2].subFields.otherGenderDetails.label as Function)(generatedContent)).toBe(
      en.otherGenderDetailsLabel
    );
    expect(applicantPlaceOfBirth.type).toBe('text');
    expect(applicantPlaceOfBirth.classes).toBe('govuk-input--width-20');
    expect((applicantPlaceOfBirth.label as Function)(generatedContent)).toBe(en.applicantPlaceOfBirthLabel);
    expect((applicantPlaceOfBirth.hint as Function)(generatedContent)).toBe(en.applicantPlaceOfBirthHint);
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
