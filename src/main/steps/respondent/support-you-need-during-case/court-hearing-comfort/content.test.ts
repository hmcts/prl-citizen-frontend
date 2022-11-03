import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need something to feel comfortable during a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  appropriatelighting: 'Appropriate lighting',
  lightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    respondentCourtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    respondentLightingDetails: {
      required: 'Please describe lighting detail',
    },
    respondentOtherProvideDetails: {
      required: 'Please describe your need in details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need something to feel comfortable during a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  appropriatelighting: 'Appropriate lighting',
  lightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    respondentCourtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    respondentLightingDetails: {
      required: 'Please describe lighting detail',
    },
    respondentOtherProvideDetails: {
      required: 'Please describe your need in details',
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
    expect(generatedContent.title).toEqual('I need something to feel comfortable during a court hearing');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'Consider in-person, phone or video, in case your preferred hearing type is not possible'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.appropriatelighting).toEqual('Appropriate lighting');
    expect(generatedContent.break).toEqual('Regular breaks');
    expect(generatedContent.space).toEqual('Space to be able to get up and move around');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.nosupport).toEqual('No, I do not need any support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain courthearing field', () => {
    const courtcomfortField = fields.respondentCourtComfort as FormOptions;
    expect(courtcomfortField.type).toBe('checkboxes');
    expect((courtcomfortField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
