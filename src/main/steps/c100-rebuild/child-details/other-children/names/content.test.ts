import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { C100RebuildPartyDetails, PartyType } from '../../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { getDataShape } from '../../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  title: 'Enter the other child’s name',
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addChildLabel: 'Add another child',
  removeChildLabel: 'Remove Child',
  newNameLabel: 'Enter a new name',
  Child: 'Child',
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
  title: 'Nodwch enw’r plentyn arall',
  firstNameLabel: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastNameLabel: 'Cyfenw(au)',
  addChildLabel: 'Ychwanegu plentyn arall',
  removeChildLabel: 'Dileu Plentyn',
  newNameLabel: 'Nodwch enw newydd',
  Child: 'Plant',
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
describe('Add children  > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      ocd_otherChildren: [
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
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
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
    const { errors } = generateFormFields([getDataShape(PartyType.OTHER_CHILDREN) as C100RebuildPartyDetails]);
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
    const { errors } = generateFormFields([getDataShape(PartyType.OTHER_CHILDREN) as C100RebuildPartyDetails]);
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

  test('should contain add children form fields', () => {
    const { 'fieldset-childDetails': fieldset, fieldset1 } = fields as Record<string, FormFields>;
    const {
      c100TempFirstName: childFirstName,
      c100TempLastName: childLastName,
      add: addChild,
    } = fieldset.subFields as FormFields;

    const { 'firstName-1': firstName, 'lastName-1': lastName, remove: removeChild } = fieldset1.subFields as FormFields;

    expect(fieldset.classes).toBe('govuk-fieldset__legend--m');
    expect(fieldset.type).toBe('fieldset');
    expect((fieldset.label as Function)(generatedContent)).toBe(`${en.newNameLabel}`);

    expect(childFirstName.type).toBe('text');
    expect(childFirstName.classes).toBe('govuk-!-width-one-half');
    expect((childFirstName.hint as Function)(generatedContent)).toBe(en.firstNameHint);
    expect((childFirstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    (childFirstName.validator as Function)('Bob');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Bob');

    expect(childLastName.type).toBe('text');
    expect(childLastName.classes).toBe('govuk-!-width-one-half');
    expect((childLastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    (childLastName.validator as Function)('Silly');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Silly');

    expect(addChild.type).toBe('button');
    expect(addChild.classes).toBe('govuk-button--secondary');
    expect((addChild.label as Function)(generatedContent)).toBe(en.addChildLabel);

    expect(fieldset1.classes).toBe('govuk-fieldset__legend--m');
    expect(fieldset1.type).toBe('fieldset');
    expect((fieldset1.label as Function)(generatedContent)).toBe('Child 1');

    expect(firstName.type).toBe('text');
    expect(firstName.classes).toBe('govuk-!-width-one-half');
    expect((firstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    (firstName.validator as Function)('Bob');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Bob');

    expect(lastName.type).toBe('text');
    expect(lastName.classes).toBe('govuk-!-width-one-half');
    expect((lastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    (lastName.validator as Function)('Silly');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Silly');

    expect(removeChild.type).toBe('button');
    expect(removeChild.classes).toBe('govuk-button--warning margin-top-3');
    expect((removeChild.label as Function)(generatedContent)).toBe(`${en.removeChildLabel} 1`);
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
