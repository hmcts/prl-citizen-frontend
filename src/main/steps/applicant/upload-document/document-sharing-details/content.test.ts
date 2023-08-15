import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseType, DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'How your documents will be shared',
  removingDetails: 'Removing details you want kept private',
  continue: 'Continue',
  restrictDocument: 'Restrict a document',
  documentSharedLine1:
    'If there are personal details, such as your address, which you do not want to be shared in the documents then you should remove them. ',
  documentSharedLine2:
    'To remove the details you should get a copy of the document, then,cross out the details you want to keep private, so that they are no longer visible.',
  documentSharedLine3:
    'The court must treat each person in the case fairly. This includes making a decision on whether the other people in the case can see this document. The court will only restrict access if:',
  restrictItems: [
    'there is a good reason not to share the document, for example safety concerns',
    'the document is not something the judge needs to see',
    'an address that needs to be kept private is included in the document',
  ],
  explainWhy: 'Explain why this document should not be shared with the other people in the case (optional).',
  cancel: 'Cancel',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  removingDetails: 'Removing details you want kept private (welsh)',
  continue: 'Parhau',
  restrictDocument: 'Restrict a document (welsh)',
  documentSharedLine1:
    'If there are personal details, such as your address, which you do not want to be shared in the documents then you should remove them. (welsh)',
  documentSharedLine2:
    'To remove the details you should get a copy of the document, then,cross out the details you want to keep private, so that they are no longer visible. (welsh)',
  documentSharedLine3:
    'The court must treat each person in the case fairly. This includes making a decision on whether the other people in the case can see this document. The court will only restrict access if: (welsh)',
  restrictItems: [
    'there is a good reason not to share the document, for example safety concerns (welsh)',
    'the document is not something the judge needs to see (welsh)',
    'an address that needs to be kept private is included in the document (welsh)',
  ],
  explainWhy: 'Explain why this document should not be shared with the other people in the case (optional). (welsh)',
  cancel: 'Canslo',
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
  // let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    // fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.section).toEqual('How your documents will be shared');
    //expect((reasonDocumentCantBeSharedFields.label as Function)(generatedContent)).toBe(en.explainWhy);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });

  test('should contain correct cancel link for fl401', () => {
    expect((form.link?.text as Function)(generatedContent)).toBe('Cancel');
    expect(form.link?.href).toBe('/applicant/task-list/1234');
  });

  test('should contain correct cancel link for c100', () => {
    commonContent.additionalData!.req.session.userCase.caseTypeOfApplication = CaseType.C100;
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    expect((form.link?.text as Function)(generatedContent)).toBe('Cancel');
    expect(form.link?.href).toBe('/case/1234');
  });
});
