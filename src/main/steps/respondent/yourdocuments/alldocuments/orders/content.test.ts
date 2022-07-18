import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent /*, FormFields,  FormOptions*/ } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Orders from the court',
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'All documents',
  title: 'Orders from the court',
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  caseNumber: 'Case number',
  continue: 'Go back',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  //let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    //fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Orders from the court'
    );
    expect(generatedContent.section).toEqual('All documents');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  // test('should contain detailsKnown field', () => {
  //   const detailsKnownField = fields.detailsKnown as FormOptions;
  //   expect(detailsKnownField.type).toBe('radios');
  //   expect(detailsKnownField.classes).toBe('govuk-radios');
  //   expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);
  // });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Go back');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
