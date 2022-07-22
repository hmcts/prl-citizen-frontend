import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'British Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the court hearing',
  courtHearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    respondentHelpCommunication: {
      required: 'Please select an answer',
    },
    respondentSignLanguageDetails: {
      required: 'Please provide sign language details',
    },
    respondentDescribeOtherNeed: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'British Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the court hearing',
  courtHearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    respondentHelpCommunication: {
      required: 'Please select an answer',
    },
    respondentSignLanguageDetails: {
      required: 'Please provide sign language details',
    },
    respondentDescribeOtherNeed: {
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
    expect(generatedContent.courtCommunication).toEqual(
      'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.hearingLoop).toEqual('Hearing loop (hearing enhancement system)');
    expect(generatedContent.infraredReceiver).toEqual('Infrared receiver (hearing enhancement system)');
    expect(generatedContent.needSpeakingHelp).toEqual('Need to be close to who is speaking');
    expect(generatedContent.lipSpeaker).toEqual('Lip speaker');
    expect(generatedContent.lipSpeakerHint).toEqual('hearing person who has been trained to be easily lip read');
    expect(generatedContent.signLanguage).toEqual('British Sign Language interpreter');
    expect(generatedContent.signLanguageDetails).toEqual('Describe what you need');
    expect(generatedContent.speechReporter).toEqual('Speech to text reporter (palantypist)');
    expect(generatedContent.extraTime).toEqual('Extra time to think and explain myself');
    expect(generatedContent.courtVisit).toEqual('Visit to court before the court hearing');
    expect(generatedContent.courtHearing).toEqual(
      'Explanation of the court hearing room layout and who will be in the room'
    );
    expect(generatedContent.intermediary).toEqual('Intermediary');
    expect(generatedContent.intermediaryHint).toEqual(
      'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better'
    );
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.otherDetails).toEqual('Describe what you need');
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

  test('should contain helpcommunication field', () => {
    const helpcommunicationField = fields.respondentHelpCommunication as FormOptions;
    expect(helpcommunicationField.type).toBe('checkboxes');
    expect((helpcommunicationField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
