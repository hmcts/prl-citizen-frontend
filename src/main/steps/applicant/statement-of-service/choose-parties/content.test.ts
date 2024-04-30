import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { cy, en, generateContent } from './content';

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('sos choose-parties content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  commonContent.additionalData = {
    req: {
      query: {
        parentDocType: 'parent',
        docType: 'doc',
      },
      params: {
        context: 'order',
      },
    },
  };
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.caption).toEqual('Case number ');
    expect(generatedContent.title).toEqual('Add a statement of service');
    expect(generatedContent.whowasserved).toEqual('Who was served?');
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.add).toEqual('Submit');
    expect(generatedContent.uploadFiles).toEqual('Your documents');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.uplodFileHintText).toEqual(
      'when uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG,BMP,PNG,TIF,PDF,DOC,or DOCX.'
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

  test('should contain continue checkboxes', () => {
    const sos_partiesServed = fields.sos_partiesServed;
    expect(sos_partiesServed.type).toBe('checkboxes');
    expect(sos_partiesServed.validator).toBe(atLeastOneFieldIsChecked);

    const sos_partiesServedDate = fields.sos_partiesServedDate;
    expect(sos_partiesServedDate.type).toBe('date');
    expect((sos_partiesServedDate.label as Function)(generatedContent)).toBe(en.servedDate);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
