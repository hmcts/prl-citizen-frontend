import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { Gender, RelationshipType, YesNoEmpty } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: "Enter the other person's name",
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  Person: 'Person',
  addOtherPersonLabel: 'Add another person',
  removeOtherPersonLabel: 'Remove person',
  newNameLabel: 'Enter name',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    c100TempLastName: {
      required: 'Enter the last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
};

const cy = {
  title: 'Nodwch enw’r unigolyn arall',
  firstNameLabel: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastNameLabel: 'Cyfenw(au)',
  Person: 'Unigolyn',
  addOtherPersonLabel: 'Ychwanegu unigolyn arall',
  removeOtherPersonLabel: 'Symud unigolyn',
  newNameLabel: 'Enter name -welsh',
  errors: {
    c100TempFirstName: {
      required: 'Nodwch yr enw cyntaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    c100TempLastName: {
      required: 'Nodwch y cyfenw',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
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
    const dummyApplicants = [
      {
        id: 'string',
        firstName: 'Bob',
        lastName: 'Rose',
        personalDetails: {
          haveYouChangeName: YesNoEmpty.EMPTY,
          applPreviousName: '',
          dateOfBirth: {
            year: '',
            month: '',
            day: '',
          },
          gender: Gender.EMPTY,
          otherGenderDetails: '',
          applicantPlaceOfBirth: '',
        },
        relationshipDetails: {
          relationshipToChildren: [
            {
              relationshipType: RelationshipType.EMPTY,
              childId: '',
            },
          ],
        },
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
      },
      {
        id: 'string',
        firstName: 'Bobi',
        lastName: 'Rose',
        personalDetails: {
          haveYouChangeName: YesNoEmpty.EMPTY,
          applPreviousName: '',
          dateOfBirth: {
            year: '',
            month: '',
            day: '',
          },
          gender: Gender.EMPTY,
          otherGenderDetails: '',
          applicantPlaceOfBirth: '',
        },
        relationshipDetails: {
          relationshipToChildren: [
            {
              relationshipType: RelationshipType.EMPTY,
              childId: '',
            },
          ],
        },
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
      },
    ];
    const fieldss = generateFormFields(dummyApplicants).fields as FormFields;

    const { fieldset1: fieldset1 } = fieldss as Record<string, FormFields>;
    const { 'firstName-1': FirstName, 'lastName-1': LastName, remove } = fieldset1.subFields as FormFields;

    expect(fieldset1.type).toBe('fieldset');
    expect((fieldset1.label as Function)(generatedContent)).toBe(en.Person + ' 1');

    expect(FirstName.type).toBe('text');
    expect((FirstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    (FirstName.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');

    expect(LastName.type).toBe('text');
    expect((LastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    (LastName.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');

    expect(remove.type).toBe('button');
    expect((remove.label as Function)(generatedContent)).toBe(en.removeOtherPersonLabel + ' 1');
  });
  test('should contain add button form fields', () => {
    const { 'fieldset-otherPersonDetails': fieldset } = fields as Record<string, FormFields>;
    const { c100TempFirstName: FirstName, c100TempLastName: LastName, add: add } = fieldset.subFields as FormFields;

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
