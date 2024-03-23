import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Upload documents',
  title: 'Upload documents',
  line1: 'You need permission to submit extra evidence',
  line2_1: 'If you want to submit evidence the court has not requested,you need to ',
  line2_2: 'complete the form C2.',
  line3: 'You may need to pay a fee to submit this application.',
  continue: 'Continue',
};

const cy: typeof en = {
  section: 'Llwytho dogfennau',
  title: 'Llwytho dogfennau',
  line1: 'Mae angen caniatâd arnoch i gyflwyno tystiolaeth ychwanegol',
  line2_1: "Os ydych eisiau cyflwyno tystiolaeth nad yw'r llys wedi gofyn amdani, mae angen i chi ",
  line2_2: 'lenwi ffurflen C2.',
  line3: "Efallai y bydd angen i chi dalu ffi i gyflwyno'r cais hwn.",
  continue: 'Parhau',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant -> upload-document -> submit-extra-evidence', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          userCase: {
            id: '123',
            caseTypeOfApplication: 'C100',
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

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Upload documents');
    expect(generatedContent.title).toEqual('Upload documents');
    expect(generatedContent.line1).toEqual('You need permission to submit extra evidence');
    expect(generatedContent.line2_1).toEqual('If you want to submit evidence the court has not requested,you need to ');
    expect(generatedContent.line2_2).toEqual('complete the form C2.');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });

  test('should contain correct cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/case/123');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
