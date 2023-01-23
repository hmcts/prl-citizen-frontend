/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { Gender, YesNoEmpty } from '../../../../app/case/definition';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { form, generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Enter your name  ',
  subTitle:
    'You and anyone else making this application are known as the applicants. <br> <br> The other people who will receive this application are known as the respondents. We will ask for their details later.',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  buttonAddApplicant: 'Add another applicant',
  removeApplicant: 'Remove applicant',
  labelFornewName: 'Enter a new name',
  errors: {
    applicantFirstName: {
      required: 'Enter the first name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    applicantLastName: {
      required: 'Enter the last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
};

const cy = {
  pageTitle: 'Nodwch eich enw',
  subTitle:
    'Gelwir chi ac unrhyw un arall sy’n gwneud y cais hwn yn ‘y ceiswyr’.<br> <br> Gelwir y bobl eraill sy’n derbyn y cais hwn yn ‘yr atebwyr.’ Byddwn yn gofyn am eu manylion yn nes ymlaen.',
  firstName: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastName: 'Cyfenw(au)',
  buttonAddApplicant: 'Ychwanegu ceisydd arall',
  removeApplicant: 'Dileu Ceisydd',
  labelFornewName: 'Nodwch enw newydd',
  errors: {
    applicantFirstName: {
      required: 'Nodwch yr enw cyntaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    applicantLastName: {
      required: 'Nodwch yr enw olaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
  },
};

const dummyApplicants = [
  {
    id: 'f944071e-278a-4421-b8de-88dcab3f5137',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test1',
    personalDetails: {
      haveYouChangeName: YesNoEmpty.EMPTY,
      applPreviousName: '',
      dateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      gender: Gender.EMPTY,
      otherGenderDetails: '',
      applicantPlaceOfBirth: '',
    },
  },
  {
    id: 'c73b9d9e-1c26-4865-a0d1-01e988c67700',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
    personalDetails: {
      haveYouChangeName: YesNoEmpty.EMPTY,
      applPreviousName: '',
      dateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      gender: Gender.EMPTY,
      otherGenderDetails: '',
      applicantPlaceOfBirth: '',
    },
  },
];

describe('checking form fields', () => {
  test('should match forms fields', () => {
    expect(JSON.stringify(form)).toEqual(
      JSON.stringify({
        fields: {
          applicantLabel: {
            type: 'heading',
            label: label => label.labelFornewName,
            labelSize: 'm',
          },
          applicantFirstName: {
            type: 'text',
            classes: 'govuk-input govuk-!-width-one-half',
            label: label => label.firstName,
            hint: hint => hint.firstNameHint,
            validator: isFieldFilledIn,
            labelSize: 'none',
          },
          applicantLastName: {
            type: 'text',
            classes: 'govuk-input govuk-!-width-one-half',
            label: label => label.lastName,
            validator: isFieldFilledIn,
            labelSize: 'none',
          },
          addAnotherApplicant: {
            type: 'button',
            label: l => l.buttonAddApplicant,
            classes: 'govuk-button--secondary margin-top-3',
            value: 'Yes',
          },
        },
        submit: {
          text: l => l.onlycontinue,
        },
        saveAndComeLater: {
          text: l => l.saveAndComeLater,
        },
      })
    );
  });
});

describe('applicant > add-applicants > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          userCase: {
            appl_allApplicants: dummyApplicants,
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

  test('applicant > add-applicants > content › chekcing generated form fields', () => {
    const formFields = generateFormFields([
      {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
        personalDetails: {
          haveYouChangeName: YesNoEmpty.EMPTY,
          applPreviousName: '',
          dateOfBirth: {
            day: '',
            month: '',
            year: '',
          },
          gender: Gender.EMPTY,
          otherGenderDetails: '',
          applicantPlaceOfBirth: '',
        },
      },
    ]);
    expect(formFields).not.toBe(null);
    expect(1).toBe(1);
  });
});
