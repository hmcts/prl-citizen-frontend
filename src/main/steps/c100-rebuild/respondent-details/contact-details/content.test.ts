import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { C100RebuildPartyDetails, PartyType, YesNoEmpty, YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Contact details of',
  subTitle:
    'Include as much detail as you can. If there’s information missing, your application may take longer to process.',
  donKnowEmailAddress: "I don't know their email",
  emailAddress: 'Email address',
  telephoneNumber: 'Telephone number',
  donKnowTelephoneNumber: "I don't know their telephone number",
  errors: {
    emailAddress: {
      required: 'Enter an email address in the correct format, like name@example.com',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    telephoneNumber: {
      required: 'Enter an answer',
      invalid: 'is invalid',
    },
  },
};

const cy = {
  title: 'Manylion cyswllt',
  subTitle:
    'Dylech gynnwys cymaint o fanylion â phosib. Os oes gwybodaeth ar goll, gall eich cais gymryd yn hirach i’w brosesu.',
  donKnowEmailAddress: 'Nid wyf yn gwybod beth yw eu cyfeiriad e-bost',
  emailAddress: 'Cyfeiriad e-bost',
  telephoneNumber: 'Rhif ffôn',
  donKnowTelephoneNumber: 'Nid wyf yn gwybod beth yw eu rhif ffônNid wyf yn gwybod beth yw eu rhif ffôn',

  errors: {
    emailAddress: {
      required: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com.',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com.',
    },
    telephoneNumber: {
      required: 'Rhowch ateb',
      invalid: 'yn annilys',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('respondent details > contact details', () => {
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
            hasNameChanged: YesNoEmpty.YES,
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

          contactDetails: {
            donKnowEmailAddress: YesOrNo.NO,
            emailAddress: 'dummy@mail.com',
            telephoneNumber: '9999999999',
            donKnowTelephoneNumber: YesOrNo.NO,
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
      (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).contactDetails
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
      (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).contactDetails
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

  test('should contain contact details form fields', () => {
    const { donKnowEmailAddress, emailAddress, telephoneNumber, donKnowTelephoneNumber } = fields as Record<
      string,
      FormFields
    >;

    expect(emailAddress.type).toBe('text');
    expect(emailAddress.classes).toBe('govuk-label');
    expect((emailAddress.label as Function)(generatedContent)).toBe(en.emailAddress);
    expect((donKnowEmailAddress.values[0].label as Function)(generatedContent)).toBe(en.donKnowEmailAddress);
    (emailAddress.validator as Function)('dummy@mail.com');
    expect(isFieldFilledIn).toHaveBeenCalledWith('dummy@mail.com');
    expect(isEmailValid).toHaveBeenCalledWith('dummy@mail.com');

    expect(telephoneNumber.type).toBe('text');
    expect(telephoneNumber.classes).toBe('govuk-input--width-10');
    expect((telephoneNumber.label as Function)(generatedContent)).toBe(en.telephoneNumber);
    expect((donKnowTelephoneNumber.values[0].label as Function)(generatedContent)).toBe(en.donKnowTelephoneNumber);
    (telephoneNumber.validator as Function)('9999999999');
    expect(isFieldFilledIn).toHaveBeenCalledWith('9999999999');
    expect(isPhoneNoValid).toHaveBeenCalledWith('9999999999');
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
