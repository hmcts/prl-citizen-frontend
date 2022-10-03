/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { childernDetails } from '../../../../app/controller/AppRequest';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { form, generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Enter the names of the children',
  subTitle: 'Only include the children you’re making this application about',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  buttonAddChild: 'Add another child',
  removeChild: 'Remove Child',
  labelFornewName: 'Enter a new name',
  errors: {
    firstname: {
      required: 'Enter the first name',
    },
    lastname: {
      required: 'Enter the last name',
    },
  },
};

const cy = {
  pageTitle: 'Enter the names of the children- welsh',
  subTitle: 'Only include the children you’re making this application about- welsh',
  firstName: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastName: 'Last name(s) - welsh',
  buttonAddChild: 'Add another child - welsh',
  removeChild: 'Remove child - welsh',
  labelFornewName: 'Enter a new name - welsh',
  errors: {
    firstname: {
      required: 'Enter the first name - welsh',
    },
    lastname: {
      required: 'Enter the last name - welsh',
    },
  },
};

const dummyChild = [
  {
    id: '8689c8b2-a4f9-45f1-823a-66e18107852d',
    firstname: 'Test1',
    lastname: 'Test1',
    personalDetails: {
      DateoBirth: '',
      isDateOfBirthKnown: '',
      ApproximateDateOfBirth: '',
      Sex: '',
    },
    childMatter: {
      isDecisionTaken: '',
    },
    parentialResponsibility: {
      statement: '',
    },
  },
  {
    id: 'b910ce67-3f36-41e8-aa74-5a1276a65368',
    firstname: 'Test2',
    lastname: 'Test2',
    personalDetails: {
      DateoBirth: '',
      isDateOfBirthKnown: '',
      ApproximateDateOfBirth: '',
      Sex: '',
    },
    childMatter: {
      isDecisionTaken: '',
    },
    parentialResponsibility: {
      statement: '',
    },
  },
];

describe('checking form fields', () => {
  test('should match forms fields', () => {
    expect(JSON.stringify(form)).toEqual(
      JSON.stringify({
        fields: {
          childLabel: {
            type: 'heading',
            label: label => label.labelFornewName,
            labelSize: 'm',
          },
          firstname: {
            type: 'text',
            classes: 'govuk-input govuk-!-width-one-half',
            label: label => label.firstName,
            hint: hint => hint.firstNameHint,
            validator: isFieldFilledIn,
            labelSize: 'none',
          },
          lastname: {
            type: 'text',
            classes: 'govuk-input govuk-!-width-one-half',
            label: label => label.lastName,
            validator: isFieldFilledIn,
            labelSize: 'none',
          },
          addAnotherChild: {
            type: 'button',
            label: l => l.buttonAddChild,
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

describe('child > add-childern > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          userCase: {
            childern: dummyChild,
            tempChildernFormData: {
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
    const { errors } = generateFormFields(dummyChild as childernDetails[]);
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
    const { errors } = generateFormFields(dummyChild as childernDetails[]);
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

  test('child > add-childern > content › checking generated form fields', () => {
    const formFields = generateFormFields([
      {
        id: 'b910ce67-3f36-41e8-aa74-5a1276a65368',
        firstname: 'Test2',
        lastname: 'Test2',
      },
    ]);
    expect(formFields).not.toBe(null);
  });
});
