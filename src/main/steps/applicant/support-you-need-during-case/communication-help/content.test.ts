import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'British Sign Language interpreter',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the court hearing',
  courthearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Please select an answer',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'British Sign Language interpreter',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the court hearing',
  courthearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Please select an answer',
    },
    describeOtherNeed: {
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
    expect(generatedContent.title).toEqual('I need help communicating and understanding');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.hearingloop).toEqual('Hearing loop (hearing enhancement system)');
    expect(generatedContent.infraredreceiver).toEqual('Infrared receiver (hearing enhancement system)');
    expect(generatedContent.needspeakinghelp).toEqual('Need to be close to who is speaking');
    expect(generatedContent.lipspeaker).toEqual('Lip speaker');
    expect(generatedContent.lipspeakerhint).toEqual('hearing person who has been trained to be easily lip read');
    expect(generatedContent.signlanguage).toEqual('British Sign Language interpreter');
    expect(generatedContent.speechreporter).toEqual('Speech to text reporter (palantypist)');
    expect(generatedContent.extratime).toEqual('Extra time to think and explain myself');
    expect(generatedContent.courtvisit).toEqual('Visit to court before the court hearing');
    expect(generatedContent.courthearing).toEqual(
      'Explanation of the court hearing room layout and who will be in the room'
    );
    expect(generatedContent.intermediary).toEqual('Intermediary');
    expect(generatedContent.intermediaryhint).toEqual(
      'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better'
    );
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

  test('should contain helpcommunication field', () => {
    const helpcommunicationField = fields.helpCommunication as FormOptions;
    expect(helpcommunicationField.type).toBe('checkboxes');
    expect((helpcommunicationField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
