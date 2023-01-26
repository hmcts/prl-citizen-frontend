import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Keeping your contact details private',
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    },
  },
};

const cyContent = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
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
      'Does the other person named in your application (the respondent) know any of your contact details?'
    );
    expect(generatedContent.section).toEqual('Keeping your contact details private');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.detailsKnown as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
