import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Keeping your contact details private',
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',

  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  address: 'Home address',
  postalAddress: 'Postal address',
  Phone_number: 'Telephone number',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  Email: 'Email',
  contact_details_private: 'Specify which contact details you want to keep private.',
  continue: 'Save and continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};

const cyContent = {
  section: 'Keeping your contact details private',
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',

  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  address: 'Home address',
  postalAddress: 'Postal address',
  Phone_number: 'Telephone number',
  Email: 'Email',
  contact_details_private: 'Specify which contact details you want to keep private.',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  continue: 'Save and continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Do you want to keep your contact details private from the other person named in the application (the respondent)?'
    );
    expect(generatedContent.section).toEqual('Keeping your contact details private');
    expect(generatedContent.line2).toEqual(
      'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.'
    );

    expect(generatedContent.contact_details_private).toEqual('Specify which contact details you want to keep private.');
    expect(generatedContent.contact_details_private_hint).toEqual(
      'Make sure you only select details the respondent does not already know.'
    );
    expect(generatedContent.Phone_number).toEqual('Telephone number');
    expect(generatedContent.address).toEqual('Home address');
    expect(generatedContent.postalAddress).toEqual('Postal address');
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain startAlternative field', () => {
    const startAlternativeField = fields.startAlternative as FormOptions;
    expect(startAlternativeField.type).toBe('radios');
    expect(startAlternativeField.classes).toBe('govuk-radios');
    expect((startAlternativeField.section as Function)(generatedContent)).toBe(enContent.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
