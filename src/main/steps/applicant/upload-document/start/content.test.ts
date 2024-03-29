import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  one: 'Do',
  two: 'Naddo',
  line1:
    'Bydd y gorchymyn llys yn dweud wrthych pa ddogfennau y mae angen i chi eu cyflwyno. Os byddwch yn cyflwyno dogfen nad yw’r llys wedi gofyn amdani, mae’n bosib y bydd y llys yn penderfynu peidio â’i hystyried.',
  continue: 'Parhau',
  errors: {
    start: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
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
    expect((detailsKnownField.label as Function)(generatedContent)).toBe(undefined);
    expect((detailsKnownField.hint as Function)(generatedContent)).toBe(undefined);

    (detailsKnownField.validator as Validator)(generatedContent);
    expect(isFieldFilledIn).toHaveBeenCalled();

    expect((detailsKnownField.values[0].label as Function)(generatedContent)).toBe(en.one);
    expect((detailsKnownField.values[1].label as Function)(generatedContent)).toBe(en.two);
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
