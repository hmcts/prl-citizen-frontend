import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  familymember: 'A friend or family member',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    courthearing: {
      required: 'Please select an answer',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
    },
  }
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  familymember: 'A friend or family member',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    courthearing: {
      required: 'Please select an answer',
    },
    communicationSupportOther: {
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
    expect(generatedContent.title).toEqual('I would need to bring support with me to a court hearing');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'Think about what you would need if the hearing was in person, by phone or video.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.supportworker).toEqual('A support worker or carer');
    expect(generatedContent.familymember).toEqual('A friend or family member');
    expect(generatedContent.assistance).toEqual('Assistance / guide dog');
    expect(generatedContent.animal).toEqual('Therapy animal');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.nosupport).toEqual('No, I do not need any extra support at this time');
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
    const courthearingField = fields.courthearing as FormOptions;
    expect(courthearingField.type).toBe('checkboxes');
    expect((courthearingField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
