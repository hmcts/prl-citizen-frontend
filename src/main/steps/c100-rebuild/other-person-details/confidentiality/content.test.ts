import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { interpolate } from '../../../common/string-parser';

import { generateContent } from './content';

const en = {
  title: 'Keeping {firstName} {lastName}’s details private',
  answersWillBeShared:
    'The answers you give in your response will be shared with other people named in this application (the respondents). This will include your contact details.',
  keepDetailsPrivate:
    'Do you want to keep {firstName} {lastName}’s contact details private from the other people named in the application (the respondents)?',
  yes: 'Yes',
  no: 'No',
  errors: {
    confidentiality: {
      required: 'Select yes if you want to keep {firstName} {lastName}’s details private',
    },
  },
};

const cy: typeof en = {
  title: 'Keeping {firstName} {lastName}’s details private (welsh)',
  answersWillBeShared:
    'The answers you give in your response will be shared with other people named in this application (the respondents). This will include your contact details. (welsh)',
  keepDetailsPrivate:
    'Do you want to keep {firstName} {lastName}’s contact details private from the other people named in the application (the respondents)? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  errors: {
    confidentiality: {
      required: 'Select yes if you want to keep {firstName} {lastName}’s details private (welsh)',
    },
  },
};

describe('other person details > confidentiality > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      oprs_otherPersons: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7945678',
          firstName: 'otherPerson-firstName',
          lastName: 'otherPerson-lastName',
          address: {
            AddressLine1: 'AddressLine1',
            AddressLine2: 'AddressLine2',
            County: 'County',
            PostCode: 'PostCode',
            PostTown: 'PostTown',
            Country: 'Country',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          otherPersonId: '7483640e-0817-4ddc-b709-6723f7945678',
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent | undefined;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions(
      'en',
      {
        ...en,
        title: interpolate(en.title, { firstName: 'otherPerson-firstName', lastName: 'otherPerson-lastName' }),
        keepDetailsPrivate: interpolate(en.keepDetailsPrivate, {
          firstName: 'otherPerson-firstName',
          lastName: 'otherPerson-lastName',
        }),
        errors: {
          ...en.errors,
          confidentiality: {
            ...en.errors.confidentiality,
            required: interpolate(en.errors.confidentiality.required, {
              firstName: 'otherPerson-firstName',
              lastName: 'otherPerson-lastName',
            }),
          },
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      {
        ...cy,
        title: interpolate(cy.title, { firstName: 'otherPerson-firstName', lastName: 'otherPerson-lastName' }),
        keepDetailsPrivate: interpolate(cy.keepDetailsPrivate, {
          firstName: 'otherPerson-firstName',
          lastName: 'otherPerson-lastName',
        }),
        errors: {
          ...cy.errors,
          confidentiality: {
            ...cy.errors.confidentiality,
            required: interpolate(cy.errors.confidentiality.required, {
              firstName: 'otherPerson-firstName',
              lastName: 'otherPerson-lastName',
            }),
          },
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain applyingWith field', () => {
    const otherPersonConfidentialField = fields.confidentiality as FormOptions;
    expect(otherPersonConfidentialField.type).toBe('radios');
    expect(otherPersonConfidentialField.classes).toBe('govuk-radios');
    expect((otherPersonConfidentialField.label as LanguageLookup)(generatedContent)).toBe(
      interpolate(en.keepDetailsPrivate, { firstName: 'otherPerson-firstName', lastName: 'otherPerson-lastName' })
    );
    expect((otherPersonConfidentialField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yes);
    expect((otherPersonConfidentialField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.no);
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
