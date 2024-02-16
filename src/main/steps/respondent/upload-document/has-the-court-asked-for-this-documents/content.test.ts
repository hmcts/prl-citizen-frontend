import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType, YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, en as commonEnContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  label: 'Has the court asked for this document?',
  continue: 'Continue',
  errors: {
    hasCourtAskedForThisDoc: {
      required: 'Select if the court has asked for this document.',
    },
  },
};

const cy: typeof en = {
  label: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  continue: 'Parhau',
  errors: {
    hasCourtAskedForThisDoc: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('respondent -> upload-document -> has-court-asked-for-this-documents', () => {
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
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain hasCourtAskedForThisDoc field', () => {
    const hasCourtAskedForThisDoc = fields.hasCourtAskedForThisDoc as FormOptions;
    expect(hasCourtAskedForThisDoc.type).toBe('radios');
    expect(hasCourtAskedForThisDoc.classes).toBe('govuk-radios');
    expect((hasCourtAskedForThisDoc.label as Function)(generatedContent)).toBe(en.label);
    expect((hasCourtAskedForThisDoc.values[0].label as Function)(commonEnContent)).toBe(YesOrNo.YES);
    expect((hasCourtAskedForThisDoc.values[1].label as Function)(commonEnContent)).toBe(YesOrNo.NO);
    expect(hasCourtAskedForThisDoc.values[1].value).toBe(YesOrNo.NO);
    expect(hasCourtAskedForThisDoc.values[0].value).toBe(YesOrNo.YES);
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });

  test('should contain correct cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/case/1234');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
