import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
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
    expect(generatedContent.title).toEqual('Has the court asked for this document?');
    expect(generatedContent.section).toEqual(' ');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.line1).toEqual(
      'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.start as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
