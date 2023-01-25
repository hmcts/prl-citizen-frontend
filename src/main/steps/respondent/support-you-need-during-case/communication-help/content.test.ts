import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the hearing',
  courtHearing: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeSignLanguageDetails: {
      required: 'Please provide sign language details',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  courtCommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  summaryText: 'Contacts for help',
  hearingLoop: 'Dolen sain (system gwella clyw)',
  infraredReceiver: 'Derbynnydd isgoch (system gwella clyw)',
  needSpeakingHelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
  lipSpeaker: 'Siaradwr gwefusau',
  lipSpeakerHint: 'clywed rhywun sydd wedi cael ei hyfforddi i allu darllen gwefusau yn rhwydd',
  signLanguage: 'Cyfieithydd iaith arwyddion',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
  extraTime: 'Amser ychwanegol i feddwl ac egluro fy hun',
  courtVisit: "Ymweld â'r llys cyn y gwrandawiad",
  courtHearing: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
  intermediary: 'Cyfryngwr',
  intermediaryHint:
    'rhywun i’ch helpu os oes gennych anghenion cyfathrebu drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  noSupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeSignLanguageDetails: {
      required: 'Please provide sign language details',
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
    expect(generatedContent.courtCommunication).toEqual(
      'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.hearingLoop).toEqual('Hearing loop (hearing enhancement system)');
    expect(generatedContent.infraredReceiver).toEqual('Infrared receiver (hearing enhancement system)');
    expect(generatedContent.needSpeakingHelp).toEqual('Need to be close to who is speaking');
    expect(generatedContent.lipSpeaker).toEqual('Lip speaker');
    expect(generatedContent.lipSpeakerHint).toEqual('hearing person who has been trained to be easily lip read');
    expect(generatedContent.signLanguage).toEqual('Sign Language interpreter');
    expect(generatedContent.signLanguageDetails).toEqual('Describe what you need');
    expect(generatedContent.speechReporter).toEqual('Speech to text reporter (palantypist)');
    expect(generatedContent.extraTime).toEqual('Extra time to think and explain myself');
    expect(generatedContent.courtVisit).toEqual('Visit to court before the hearing');
    expect(generatedContent.courtHearing).toEqual("Explanation of the court and who's in the room at the hearing");
    expect(generatedContent.intermediary).toEqual('Intermediary');
    expect(generatedContent.intermediaryHint).toEqual(
      'a person to help you if you have communication needs by providing professional support to participate in a hearing'
    );
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.otherDetails).toEqual('Describe what you need');
    expect(generatedContent.noSupport).toEqual('No, I do not need any support at this time');
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
