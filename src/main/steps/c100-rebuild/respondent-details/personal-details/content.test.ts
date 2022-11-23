import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import {
  C100RebuildPartyDetails,
  PartyType,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
} from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Provide details for',
  hasNameChanged: 'Have they changed their name?',
  hasNameChangedHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names',
  one: 'Yes',
  two: 'No',
  respondentPlaceOfBirth: 'Place of birth',
  respondentPlaceOfBirthHint: 'For example, town or city',
  dontKnow: "Don't know",
  dobLabel: 'Date of birth',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  previousName: 'Enter their previous name',
  previousNameHint: 'This should be the full legal name(including any middle names)',
  respondentGenderLabel: 'Gender',
  male: 'Male',
  female: 'Female',
  other: 'They identify in another way',
  respondentPlaceOfBirthUnknown: 'I don’t know their place of birth',
  otherGenderDetailsLabel: "Respondent's gender (Optional)",
  errors: {
    hasNameChanged: {
      required: 'Select if they’ve changed their name',
    },
    previousFullName: {
      required: 'Enter their previous name',
    },
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
    gender: {
      required: 'Select the gender',
    },
    respondentPlaceOfBirth: {
      required: 'Enter their place of birth',
    },
  },
};

const cy = {
  title: 'Provide details for - welsh',
  hasNameChanged: 'Have they changed their name? - welsh',
  hasNameChangedHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names - welsh',
  one: 'Yes',
  two: 'No',
  respondentPlaceOfBirth: 'Place of birth',
  respondentPlaceOfBirthHint: 'For example, town or city',
  dontKnow: "Don't know - welsh",
  dobLabel: 'Date of birth - welsh',
  approxCheckboxLabel: 'I don’t know their date of birth - welsh',
  approxDobLabel: 'Approximate date of birth - welsh',
  previousName: 'Enter their previous name -welsh',
  previousNameHint: 'This should be the full legal name(including any middle names) -welsh',
  respondentGenderLabel: 'Gender - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  other: 'They identify in another way - welsh',
  respondentPlaceOfBirthUnknown: 'I don’t know their place of birth - welsh',
  otherGenderDetailsLabel: "Respondent's gender (Optional) - welsh",
  errors: {
    hasNameChanged: {
      required: 'Select if they’ve changed their name -welsh',
    },
    previousFullName: {
      required: 'Enter their previous name -welsh',
    },
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
    gender: {
      required: 'Select the gender - welsh',
    },
    respondentPlaceOfBirth: {
      required: 'Enter their place of birth -welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('respondent details > personal details', () => {
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            hasNameChanged: YesNoDontKnow.yes,
            previousFullName: YesNoEmpty.YES,
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
            respondentPlaceOfBirth: '',
            respondentPlaceOfBirthUnknown: YesOrNo.YES,
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
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
      (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).personalDetails
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
      (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).personalDetails
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
    const {
      respondentPlaceOfBirth,
      hasNameChanged,
      dateOfBirth,
      isDateOfBirthUnknown,
      gender,
      respondentPlaceOfBirthUnknown,
    } = fields as Record<string, FormFields>;

    expect(hasNameChanged.type).toBe('radios');
    expect(hasNameChanged.classes).toBe('govuk-radios');
    expect((hasNameChanged.label as Function)(generatedContent)).toBe(en.hasNameChanged);
    expect((hasNameChanged.hint as Function)(generatedContent)).toBe(en.hasNameChangedHint);
    expect((hasNameChanged.values[0].label as Function)(generatedContent)).toBe(en.one);

    expect(hasNameChanged.values[0].subFields.previousFullName.type).toBe('text');
    expect((hasNameChanged.values[0].subFields.previousFullName.hint as Function)(generatedContent)).toBe(
      en.previousNameHint
    );
    expect((hasNameChanged.values[0].subFields.previousFullName.label as Function)(generatedContent)).toBe(
      en.previousName
    );

    expect((hasNameChanged.values[1].label as Function)(generatedContent)).toBe(en.two);
    expect((hasNameChanged.values[2].label as Function)(generatedContent)).toBe(en.dontKnow);

    expect(dateOfBirth.type).toBe('date');
    expect(dateOfBirth.classes).toBe('govuk-date-input');
    expect((dateOfBirth.label as Function)(generatedContent)).toBe(en.dobLabel);
    (dateOfBirth.validator as Validator)(commonContent.userCase!.resp_Respondents![0].personalDetails.dateOfBirth);
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
      commonContent.userCase!.resp_Respondents![0].personalDetails.dateOfBirth
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
    expect((gender.label as Function)(generatedContent)).toBe(en.respondentGenderLabel);
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
    expect(respondentPlaceOfBirth.type).toBe('text');
    expect(respondentPlaceOfBirth.classes).toBe('govuk-input--width-20');
    expect((respondentPlaceOfBirth.label as Function)(generatedContent)).toBe(en.respondentPlaceOfBirth);
    expect((respondentPlaceOfBirth.hint as Function)(generatedContent)).toBe(en.respondentPlaceOfBirthHint);
    expect((respondentPlaceOfBirthUnknown.values[0].label as Function)(generatedContent)).toBe(
      en.respondentPlaceOfBirthUnknown
    );
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
