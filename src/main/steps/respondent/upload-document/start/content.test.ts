import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: ' ',
  label: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  label: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  one: 'Do',
  two: 'Naddo',
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
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: { userCase: { id: '1234' } },
        params: {
          documentCategory: DocCategory.WITNESS_STATEMENT,
          docType: DocType.YOUR_WITNESS_STATEMENTS,
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

  test('should return correct english content', () => {
    expect(generatedContent.label).toEqual('Has the court asked for this document?');
    expect(generatedContent.section).toEqual(' ');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain start field', () => {
    const startField = fields.start as FormOptions;
    expect(startField.type).toBe('radios');
    expect(startField.classes).toBe('govuk-radios');
    expect((startField.section as Function)(generatedContent)).toBe(en.section);
    expect((startField.label as Function)(generatedContent)).toBe(en.label);
    expect((startField.values[0].label as Function)(generatedContent)).toBe('Yes');
    expect((startField.values[1].label as Function)(generatedContent)).toBe('No');
    expect((startField.hint as Function)(generatedContent)).toBe(undefined);
    expect(startField.values[1].value).toBe('No');
    expect(startField.values[0].value).toBe('Yes');
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
