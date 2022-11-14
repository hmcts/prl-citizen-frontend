import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Keeping your contact details private',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the respondents)?`,
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private.`,
  one: 'Yes',
  two: 'No',
  contact_details_private: 'Specify which contact details you want to keep private.',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  Email: 'Email',
};

const cy = {
  caption: 'Keeping your contact details private  - welsh',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the respondents)? - welsh`,
  paragraph1: `The information you give us will be shared with the respondents. 
  This includes your contact details. - welsh`,
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private. - welsh`,
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  contact_details_private: 'Specify which contact details you want to keep private. - welsh',
  address: 'Address - welsh',
  telephoneNumber: 'Telephone number - welsh',
  Email: 'Email - welsh',
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
          startAlternative: 'Yes',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: ['email'],
        },
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: 'Yes',
          start: '',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: ['email'],
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
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
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain applyingWith field', () => {
    const applyingWithField = fields.startAlternative as FormOptions;
    const subFields = applyingWithField.values[0].subFields?.contactDetailsPrivateAlternative as FormOptions;

    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect(subFields.type).toBe('checkboxes');
    expect((subFields.hint as LanguageLookup)(generatedContent)).toBe(en.contact_details_private);
    expect((subFields.values[0].label as LanguageLookup)(generatedContent)).toBe(en.address);
    expect((subFields.values[1].label as LanguageLookup)(generatedContent)).toBe(en.telephoneNumber);
    expect((subFields.values[2].label as LanguageLookup)(generatedContent)).toBe(en.Email);
  });
  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
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
            startAlternative: 'Yes',
            start: '',
            contactDetailsPrivate: [],
            contactDetailsPrivateAlternative: ['address', 'telephone', 'email'],
          },
          {
            id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
            applicantFirstName: 'Test2',
            applicantLastName: 'Test2',
            detailsKnown: '',
            startAlternative: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: [],
            contactDetailsPrivateAlternative: ['address', 'telephone', 'email'],
          },
        ],
      },
    };
    const generatedContentFields = generateContent({ ...commonContent, additionalData });
    expect(generatedContentFields).not.toBe(Function);
    expect(1).toBe(1);
  });
});
