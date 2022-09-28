import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { cy, en, generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const dummyApplicantData = [
  {
    id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: ['email'],
    contactDetailsPrivateAlternative: ['email'],
  },
  {
    id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: ['email'],
    contactDetailsPrivateAlternative: ['email'],
  },
];

const enLanguageContent = {
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will keep your contact details private',
  p1: 'You have told us you want to keep these contact details private',
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court.',
  listOfCofidentialInfromations: [
    { key: 'address', value: 'Address' },
    { key: 'homephone', value: 'Home phone number' },
    { key: 'mobilephone', value: 'Mobile phone number' },
    { key: 'email', value: 'Email' },
  ],
};

const cyLanguageContent = {
  caption: 'Keeping your contact details private  - welsh',
  headingTitle: 'The court will keep your contact details private- welsh ',
  p1: 'You have told us you want to keep these contact details private - welsh',
  heading3: 'What the court will do - welsh',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court. - welsh',
  listOfCofidentialInfromations: [
    { key: 'address', value: 'Address - welsh' },
    { key: 'homephone', value: 'Home phone number - welsh' },
    { key: 'mobilephone', value: 'Mobile phone number - welsh' },
    { key: 'email', value: 'Email - welsh' },
  ],
};

describe('applicant personal details > confidentiality > feedback', () => {
  const commonContent = {
    language: 'en',
    userCase: { appl_allApplicants: dummyApplicantData },
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
    expect(en()).toEqual(enLanguageContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    expect(cy()).toEqual(cyLanguageContent);
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.fields as FormOptions;
    expect(applyingWithField?.type).not.toBe('radios');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
