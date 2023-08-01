import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const docsEmail = 'example@test.com';
//const docsEmail = 'citizen-upload-docs-email';

const en = {
  section: 'How your documents will be shared',
  email: docsEmail,
  continue: 'Continue',
  warning: 'Warning',
  warningTxt: 'When you upload a document, it will  be shared with the other people in the case.',
  documentSharedLine1:
    'If there is information that should not be shared, remove it from the document. If this is not possible, do not upload the document. Instead, you can ask  the court to restrict who can see the document. ',
  documentSharedLine2: 'The court will only agree to restrict who can see the document if:',
  documentSharedLine3: 'there is a good reason not to share the document, for example safety concerns',
  documentSharedLine4: 'the document is not something the judge needs to see',
  documentSharedLine5: 'an address that needs to be kept private is included in the document',
  documentSharedLine6: 'If you want the court to restrict who can see a document, email: ',
  documentSharedLine7: 'You must say why the document should be restricted.',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  email: docsEmail,
  continue: 'Parhau',
  warning: 'Rhybudd',
  warningTxt: 'Pan fyddwch yn cyflwyno dogfen, bydd yn cael ei rhannu gyda’r bobl eraill yn yr achos.',
  documentSharedLine1:
    'Os yw’n cynnwys gwybodaeth na ddylid ei rhannu, dilëwch yr wybodaeth berthnasol o’r ddogfen. Os nad yw hyn yn bosibl, peidiwch â chyflwyno’r ddogfen. Yn hytrach, gallwch ofyn i’r llys atal rhai pobl rhag gallu gweld y ddogfen.',
  documentSharedLine2: 'Bydd y llys ond yn atal rhai pobl rhag gallu gweld y ddogfen:',
  documentSharedLine3: 'os oes rheswm da dros beidio â rhannu’r ddogfen, er enghraifft pryderon diogelwch',
  documentSharedLine4: 'nid yw’r ddogfen yn rhywbeth y mae’r barnwr angen ei gweld',
  documentSharedLine5: 'mae cyfeiriad sydd angen ei gadw’n breifat wedi’i gynnwys yn y ddogfen',
  documentSharedLine6: 'Os ydych eisiau i’r llys atal rhai pobl rhag gallu gweld dogfen, anfonwch neges e-bost i:',
  documentSharedLine7: 'Mae’n rhaid ichi ddweud pam na ddylai rhai pobl weld y ddogfen.',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          documentCategory: DocCategory.WITNESS_STATEMENT,
          docType: DocType.YOUR_WITNESS_STATEMENTS,
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
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.email).toEqual(docsEmail);
    expect(generatedContent.section).toEqual('How your documents will be shared');
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
});
/* eslint-enable @typescript-eslint/ban-types */
