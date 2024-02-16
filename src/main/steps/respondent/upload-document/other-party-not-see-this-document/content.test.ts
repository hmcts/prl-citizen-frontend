import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
const en = {
  reasonsToNotSeeTheDocument: 'Why should the other party not see this document?',
  confidentialDetailsLabel: 'It contains confidential details',
  confidentialDetailsHint: 'For example, my address, email address or telephone number.',
  sensitiveInfoLabel: 'It contains sensitive information',
  sensitiveInfoHint: 'For example, medical information or a criminal record.',
  reasonsToRestrictDocument:
    'Give reasons why you need to restrict this document. The court will only restrict if it you have a very good reason.',
  errors: {
    reasonsToNotSeeTheDocument: {
      required: 'Select why the other party should not see this document.',
    },
    reasonsToRestrictDocument: {
      required: 'Enter reasons why you need to restrict this document.',
    },
  },
};

const cy: typeof en = {
  reasonsToNotSeeTheDocument: 'Why should the other party not see this document? - welsh',
  confidentialDetailsLabel: 'It contains confidential details - welsh',
  confidentialDetailsHint: 'For example, my address, email address or telephone number. - welsh',
  sensitiveInfoLabel: 'It contains sensitive information - welsh',
  sensitiveInfoHint: 'For example, medical information or a criminal record. - welsh',
  reasonsToRestrictDocument:
    'Give reasons why you need to restrict this document. The court will only restrict if it you have a very good reason.',
  errors: {
    reasonsToNotSeeTheDocument: {
      required: 'Select why the other party should not see this document. - welsh',
    },
    reasonsToRestrictDocument: {
      required: 'Enter reasons why you need to restrict this document. - welsh',
    },
  },
};

describe('respondent -> upload-document -> other-party-not-see-this-document', () => {
  let generatedContent;
  let form;
  let fields;

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

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent({ ...commonContent, language: 'en' }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain reasonsToNotSeeTheDocument field', () => {
    const reasonsToNotSeeTheDocument = fields.reasonsToNotSeeTheDocument as FormOptions;
    expect(reasonsToNotSeeTheDocument.type).toBe('checkboxes');
    expect((reasonsToNotSeeTheDocument.values[0].label as Function)(generatedContent)).toBe(
      en.confidentialDetailsLabel
    );
    expect((reasonsToNotSeeTheDocument.values[0].hint as Function)(generatedContent)).toBe(en.confidentialDetailsHint);
    expect((reasonsToNotSeeTheDocument.values[1].label as Function)(generatedContent)).toBe(en.sensitiveInfoLabel);
    expect((reasonsToNotSeeTheDocument.values[1].hint as Function)(generatedContent)).toBe(en.sensitiveInfoHint);
    expect(
      (reasonsToNotSeeTheDocument.values[1].subFields?.reasonsToRestrictDocument.label as Function)(generatedContent)
    ).toBe(en.reasonsToRestrictDocument);
    expect(reasonsToNotSeeTheDocument.values[1].subFields?.reasonsToRestrictDocument.type).toBe('textarea');

    const response = fields.reasonsToNotSeeTheDocument.values[1].subFields!.reasonsToRestrictDocument.validator('Test');
    expect(response).toEqual(undefined);
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');
    expect(isTextAreaValid).toHaveBeenCalledWith('Test');
  });

  test('should contain continue button', () => {
    expect(form.onlyContinue.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain correct cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/case/1234');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
