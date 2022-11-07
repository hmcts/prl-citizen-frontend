import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Enter the other respondents name',
  subTitle: 'The other people who will receive this application are known as the respondents',
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addRespondentLabel: 'Add another respondent',
  removeRespondentLabel: 'Remove respondent',
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
  title: 'Enter the other respondents name- welsh',
  subTitle: 'The other people who will receive this application are known as the respondents - welsh',
  firstNameLabel: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastNameLabel: 'Last name(s) - welsh',
  addRespondentLabel: 'Add another respondent - welsh',
  removeRespondentLabel: 'Remove respondent - welsh',
  newNameLabel: 'Enter a new name - welsh',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name - welsh',
    },
    c100TempLastName: {
      required: 'Enter the last name - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Add respondent  > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            repondentDetials: 'YES',
            gender: 'Male',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: 'Father',
                childId: '7483640e-0817-4ddc-b709-6723f7925475',
              },
            ],
          },
          respondentContactDetail: {
            emailAddress: 'test@gmail.com',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
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
    const { errors } = generateFormFields([getDataShape()]);
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
    const { errors } = generateFormFields([getDataShape()]);
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

  test('should contain add respondents form fields', () => {
    const { 'fieldset-respondentDetails': fieldset, fieldset1 } = fields as Record<string, FormFields>;
    const { c100TempFirstName, c100TempLastName, addRespondent } = fieldset.subFields as FormFields;

    const { 'firstName-1': firstName, 'lastName-1': lastName, removeRespondent } = fieldset1.subFields as FormFields;

    expect(fieldset.classes).toBe('govuk-fieldset__legend--m');
    expect(fieldset.type).toBe('fieldset');
    expect((fieldset.label as Function)(generatedContent)).toBe(`${en.newNameLabel}`);

    expect(c100TempFirstName.type).toBe('text');
    expect(c100TempFirstName.classes).toBe('govuk-!-width-one-half');
    expect((c100TempFirstName.hint as Function)(generatedContent)).toBe(en.firstNameHint);
    expect((c100TempFirstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    (c100TempFirstName.validator as Function)('John');
    expect(isFieldFilledIn).toHaveBeenCalledWith('John');

    expect(c100TempLastName.type).toBe('text');
    expect(c100TempLastName.classes).toBe('govuk-!-width-one-half');
    expect((c100TempLastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    (c100TempLastName.validator as Function)('Doe');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Doe');

    expect(addRespondent.type).toBe('button');
    expect(addRespondent.classes).toBe('govuk-button--secondary');
    expect((addRespondent.label as Function)(generatedContent)).toBe(en.addRespondentLabel);

    expect(fieldset1.classes).toBe('govuk-fieldset__legend--m');
    expect(fieldset1.type).toBe('fieldset');
    expect((fieldset1.label as Function)(generatedContent)).toBe('Respondent 1');

    expect(firstName.type).toBe('text');
    expect(firstName.classes).toBe('govuk-!-width-one-half');
    expect((firstName.label as Function)(generatedContent)).toBe(en.firstNameLabel);
    (firstName.validator as Function)('John');
    expect(isFieldFilledIn).toHaveBeenCalledWith('John');

    expect(lastName.type).toBe('text');
    expect(lastName.classes).toBe('govuk-!-width-one-half');
    expect((lastName.label as Function)(generatedContent)).toBe(en.lastNameLabel);
    (lastName.validator as Function)('Doe');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Doe');

    expect(removeRespondent.type).toBe('button');
    expect(removeRespondent.classes).toBe('govuk-button--warning margin-top-3');
    expect((removeRespondent.label as Function)(generatedContent)).toBe(`${en.removeRespondentLabel} 1`);
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
