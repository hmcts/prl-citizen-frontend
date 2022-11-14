import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Keeping your contact details private',
  headingTitle: 'Do the other people named in this application (the respondents) know any of your contact details?    ',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
};

const cy = {
  caption: 'Keeping your contact details private  - welsh',
  headingTitle:
    'Do the other people named in this application (the respondents) know any of your contact details? - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "I don't know - Welsh",
};

describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantFirstName: 'Test1',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    },
    additionalData: {
      req: {
        query: {
          applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      },
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
  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.detailsKnown as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((applyingWithField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);
  });

  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('rendering form fields', () => {
    const additionalData = {
      req: {
        params: {
          applicantId: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
        },
      },
      userCase: {
        appl_allApplicants: [
          {
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            applicantFirstName: 'Test1',
            applicantLastName: 'Test2',
            detailsKnown: 'Yes',
            startAlternative: '',
            start: '',
            contactDetailsPrivate: [],
            contactDetailsPrivateAlternative: [],
          },
          {
            id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
            applicantFirstName: 'Test2',
            applicantLastName: 'Test2',
            detailsKnown: 'No',
            startAlternative: '',
            start: '',
            contactDetailsPrivate: [],
            contactDetailsPrivateAlternative: [],
          },
          {
            id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
            applicantFirstName: 'Test2',
            applicantLastName: 'Test2',
            detailsKnown: 'I dont know',
            startAlternative: '',
            start: '',
            contactDetailsPrivate: [],
            contactDetailsPrivateAlternative: [],
          },
        ],
      },
    };
    type PageContent = Record<string, unknown>;
    const generatedContentFields: PageContent = generateContent({ ...commonContent, additionalData });
    expect(generatedContentFields.form).not.toBe(0);
  });
});
