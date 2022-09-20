/* eslint-disable @typescript-eslint/no-unused-vars */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Enter your name  ',
  subTitle:
    'Only include the children you’re making this application about <br> <br> The other people who will receive this application are known as the respondents. We will ask for their details later.',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  buttonAddApplicant: 'Add another applicant',
  removeApplicant: 'Remove applicant',
  labelFornewName: 'Enter a new name',
  errors: {
    applicantFirstName: {
      required: 'Enter the first name',
    },
    applicantLastName: {
      required: 'Enter the last name',
    },
  },
};

const cy = {
  pageTitle: 'Enter your name - welsh',
  subTitle:
    'Only include the children you’re making this application about <br> <br> The other people who will receive this application are known as the respondents. We will ask for their details later. - welsh',
  firstName: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastName: 'Last name(s) - welsh',
  buttonAddApplicant: 'Add another applicant - welsh',
  removeApplicant: 'Remove applicant - welsh',
  labelFornewName: 'Enter a new name - welsh',
  errors: {
    applicantFirstName: {
      required: 'Enter the first name - welsh',
    },
    applicantLastName: {
      required: 'Enter the last name - welsh',
    },
  },
};

const dummyApplicants = [
  {
    id: 'f944071e-278a-4421-b8de-88dcab3f5137',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test1',
  },
  {
    id: 'c73b9d9e-1c26-4865-a0d1-01e988c67700',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
  },
];
describe('applicant > add-applicants > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          userCase: {
            allApplicants: dummyApplicants,
            applicantTemporaryFormData: {
              TempFirstName: 'dummy',
              TempLastName: 'dummy',
            },
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    const { errors } = generateFormFields(dummyApplicants);
    languageAssertions(
      'en',
      {
        ...en,
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
    const { errors } = generateFormFields(dummyApplicants);
    languageAssertions(
      'cy',
      {
        ...cy,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
