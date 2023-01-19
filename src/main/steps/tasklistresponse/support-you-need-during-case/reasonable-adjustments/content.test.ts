import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  summaryText: 'Contacts for help',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need help communicating and understanding',
  commHelpHint: 'for example, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    respondentReasonableAdjustments: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  summaryText: 'Contacts for help',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need help communicating and understanding',
  commHelpHint: 'for example, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    respondentReasonableAdjustments: {
      required: 'Please select an answer',
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
    expect(generatedContent.title).toEqual(
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?'
    );
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.'
    );
    expect(generatedContent.optionHint).toEqual(
      'Select all that apply to you - specific requirements can be given next'
    );
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.docsFormat).toEqual('I need documents in an alternative format');
    expect(generatedContent.docsFormatHint).toEqual('for example, braille or different colours and text sizes');
    expect(generatedContent.commHelp).toEqual('I need help communicating and understanding');
    expect(generatedContent.commHelpHint).toEqual('for example, hearing, speaking or interpretation');
    expect(generatedContent.hearingSupport).toEqual('I need to bring support with me to a hearing');
    expect(generatedContent.hearingSupportHint).toEqual('for example, someone you know or an assistance animal');
    expect(generatedContent.hearingComfort).toEqual('I need something to feel comfortable during a hearing');
    expect(generatedContent.hearingComfortHint).toEqual('for example, breaks or extra space');
    expect(generatedContent.travellingHelp).toEqual('I need help travelling to, or moving around court buildings');
    expect(generatedContent.travellingHelpHint).toEqual(
      'for example, access and mobility support if a hearing takes place in person'
    );
    expect(generatedContent.noSupport).toEqual('No, I do not need any extra support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain reasonableAdjustments field', () => {
    const reasonableAdjustmentsField = fields.respondentReasonableAdjustments as FormOptions;
    expect(reasonableAdjustmentsField.type).toBe('checkboxes');
    expect((reasonableAdjustmentsField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
