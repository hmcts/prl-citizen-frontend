import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: "Enter the other person's name",
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addOtherPersonLabel: 'Add another person',
  removeOtherPersonLabel: 'Remove person',
  newNameLabel: 'Enter a new name',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name',
    },
    c100TempLastName: {
      required: 'Enter the last name',
    },
  },
};

const cy = {
  title: 'Nodwch enw’r unigolyn arall',
  firstNameLabel: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastNameLabel: 'Cyfenw(au)',
  addOtherPersonLabel: 'Ychwanegu unigolyn arall',
  removeOtherPersonLabel: 'Symud unigolyn',
  newNameLabel: 'Nodwch enw newydd',
  errors: {
    c100TempFirstName: {
      required: 'Nodwch yr enw cyntaf',
    },
    c100TempLastName: {
      required: 'Nodwch yr enw olaf',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Add other person  > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      cd_otherperson: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '2019',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
        },
      ],
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
    languageAssertions(
      'en',
      {
        ...en,
        errors: {
          ...en.errors,
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
        errors: {
          ...cy.errors,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain add person form fields', () => {
    const {
      'fieldset-otherPersonDetails': fieldset,
      //fieldset1
    } = fields as Record<string, FormFields>;
    const { c100TempFirstName: FirstName, c100TempLastName: LastName, add: add } = fieldset.subFields as FormFields;

    // const { 'firstName-1': firstName, 'lastName-1': lastName, remove: remove } = fieldset1.subFields as FormFields;

    expect(fieldset.classes).toBe('govuk-fieldset__legend--m');
    expect(fieldset.type).toBe('fieldset');
    expect((fieldset.label as Function)(generatedContent)).toBe(`${en.newNameLabel}`);

    expect(FirstName.type).toBe('text');
    expect(FirstName.classes).toBe('govuk-!-width-one-half');
    expect((FirstName.hint as Function)(generatedContent)).toBe(en.firstNameHint);
    expect((FirstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    (FirstName.validator as Function)('Bob');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Bob');

    expect(LastName.type).toBe('text');
    expect(LastName.classes).toBe('govuk-!-width-one-half');
    expect((LastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    (LastName.validator as Function)('Silly');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Silly');

    expect(add.type).toBe('button');
    expect(add.classes).toBe('govuk-button--secondary');
    expect((add.label as Function)(generatedContent)).toBe(en.addOtherPersonLabel);

    // expect(fieldset1.classes).toBe('govuk-fieldset__legend--m');
    // expect(fieldset1.type).toBe('fieldset');
    // expect((fieldset1.label as Function)(generatedContent)).toBe('other Person 1');

    // expect(firstName.type).toBe('text');
    // expect(firstName.classes).toBe('govuk-!-width-one-half');
    // expect((firstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    // (firstName.validator as Function)('Bob');
    // expect(isFieldFilledIn).toHaveBeenCalledWith('Bob');

    // expect(lastName.type).toBe('text');
    // expect(lastName.classes).toBe('govuk-!-width-one-half');
    // expect((lastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    // (lastName.validator as Function)('Silly');
    // expect(isFieldFilledIn).toHaveBeenCalledWith('Silly');

    // expect(remove.type).toBe('button');
    // expect(remove.classes).toBe('govuk-button--warning margin-top-3');
    // expect((remove.label as Function)(generatedContent)).toBe(`${en.removeOtherPersonLabel} 1`);
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
