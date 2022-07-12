import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  docsprint: 'I need documents printed in a particular colour or font',
  docsreadformat: 'Documents in an easy read format',
  brailledocs: 'Braille documents',
  largeprintdocs: 'Documents in large print',
  docsaudio: 'Audio translation of documents',
  readoutdocs: 'Documents read out to me',
  emailInfo: 'Information emailed to me',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'I do not need any of this support at this time',
  continue: 'Save and continue',
  errors: {
    respondentDocsSupport: {
      required: 'Please select an answer',
    },
    respondentOtherDetails: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  docsprint: 'I need documents printed in a particular colour or font',
  docsreadformat: 'Documents in an easy read format',
  brailledocs: 'Braille documents',
  largeprintdocs: 'Documents in large print',
  docsaudio: 'Audio translation of documents',
  readoutdocs: 'Documents read out to me',
  emailInfo: 'Information emailed to me',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'I do not need any of this support at this time',
  continue: 'Save and continue',
  errors: {
    respondentDocsSupport: {
      required: 'Please select an answer',
    },
    respondentOtherDetails: {
      required: 'Please provide the details',
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
    expect(generatedContent.title).toEqual('I need documents in an alternative format');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.docsprint).toEqual('I need documents printed in a particular colour or font');
    expect(generatedContent.docsreadformat).toEqual('Documents in an easy read format');
    expect(generatedContent.brailledocs).toEqual('Braille documents');
    expect(generatedContent.largeprintdocs).toEqual('Documents in large print');
    expect(generatedContent.docsaudio).toEqual('Audio translation of documents');
    expect(generatedContent.readoutdocs).toEqual('Documents read out to me');
    expect(generatedContent.emailInfo).toEqual('Information emailed to me');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.nosupport).toEqual('I do not need any of this support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain docsSupport field', () => {
    const docsSupportField = fields.respondentDocsSupport as FormOptions;
    expect(docsSupportField.type).toBe('checkboxes');
    expect((docsSupportField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
