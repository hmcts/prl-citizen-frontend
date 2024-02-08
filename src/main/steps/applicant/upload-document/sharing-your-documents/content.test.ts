import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType, YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, en as commonContentEN, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
const en = {
  pageTitle: 'Sharing your documents',
  infoContent:
    'The court will share documents with the other people in the case unless there is a very good reason not to. For example, safety concerns or sensitive information is included.',
  haveReasonForDocNotToBeShared:
    'Is there a very good reason why you do not want the other people in the case to see this document?',
  errors: {
    haveReasonForDocNotToBeShared: {
      required:
        'Select if there is a very good reason why you do not want the other people in the case to see this document.',
    },
  },
};

const cy: typeof en = {
  pageTitle: 'Sharing your documents - welsh',
  infoContent:
    'The court will share documents with the other people in the case unless there is a very good reason not to. For example, safety concerns or sensitive information is included. - welsh',
  haveReasonForDocNotToBeShared:
    'Is there a very good reason why you do not want the other people in the case to see this document? - welsh',
  errors: {
    haveReasonForDocNotToBeShared: {
      required:
        'Select if there is a very good reason why you do not want the other people in the case to see this document. - welsh',
    },
  },
};

describe('applicant -> upload-document -> sharing-your-documents', () => {
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
    expect(generatedContent.pageTitle).toEqual('Sharing your documents');
    expect(generatedContent.infoContent).toEqual(
      'The court will share documents with the other people in the case unless there is a very good reason not to. For example, safety concerns or sensitive information is included.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain haveReasonForDocNotToBeShared field', () => {
    const haveReasonForDocNotToBeShared = fields.haveReasonForDocNotToBeShared as FormOptions;
    expect(haveReasonForDocNotToBeShared.type).toBe('radios');
    expect(haveReasonForDocNotToBeShared.classes).toBe('govuk-radios');
    expect((haveReasonForDocNotToBeShared.label as Function)(generatedContent)).toBe(
      'Is there a very good reason why you do not want the other people in the case to see this document?'
    );

    (haveReasonForDocNotToBeShared.validator as Validator)(generatedContent);
    expect(isFieldFilledIn).toHaveBeenCalled();

    expect((haveReasonForDocNotToBeShared.values[0].label as Function)(commonContentEN)).toBe(YesOrNo.NO);
    expect((haveReasonForDocNotToBeShared.values[1].label as Function)(commonContentEN)).toBe(YesOrNo.YES);
  });

  test('should contain continue button', () => {
    expect(form.submit.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain correct cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/applicant/task-list/1234');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
