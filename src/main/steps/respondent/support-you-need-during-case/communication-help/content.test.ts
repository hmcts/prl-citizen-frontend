import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
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
    signLanguageDetails: {
      required: 'Please provide sign language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  courtCommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  hearingLoop: 'Dolen sain (system gwella clyw)',
  infraredReceiver: 'Derbynnydd isgoch (system gwella clyw)',
  needSpeakingHelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
  lipSpeaker: 'Siaradwr gwefusau',
  lipSpeakerHint: 'clywed rhywun sydd wedi cael ei hyfforddi i allu darllen gwefusau yn rhwydd',
  signLanguage: 'Cyfieithydd iaith arwyddion',
  signLanguageDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  speechReporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
  extraTime: 'Amser ychwanegol i feddwl ac egluro fy hun',
  courtVisit: "Ymweld â'r llys cyn y gwrandawiad",
  courtHearing: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
  intermediary: 'Cyfryngwr',
  intermediaryHint:
    'rhywun i’ch helpu os oes gennych anghenion cyfathrebu drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  noSupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    helpCommunication: {
      required: 'Dewiswch pa gymorth sydd ei angen arnoch wrth gyfathrebu a deall',
    },
    signLanguageDetails: {
      required: 'Rhowch fanylion yr iaith arwyddion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    describeOtherNeed: {
      required: 'Rhowch fanylion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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

    expect((helpcommunicationField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((helpcommunicationField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.hearingLoop);
    expect((helpcommunicationField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.infraredReceiver);
    expect((helpcommunicationField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.needSpeakingHelp);
    expect((helpcommunicationField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.lipSpeakerHint);
    expect((helpcommunicationField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.lipSpeaker);
    expect((helpcommunicationField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.signLanguage);
    expect((helpcommunicationField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.speechReporter);
    expect((helpcommunicationField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.extraTime);
    expect((helpcommunicationField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.courtVisit);
    expect((helpcommunicationField.values[8].label as LanguageLookup)(generatedContent)).toBe(en.courtHearing);
    expect((helpcommunicationField.values[9].hint as LanguageLookup)(generatedContent)).toBe(en.intermediaryHint);
    expect((helpcommunicationField.values[9].label as LanguageLookup)(generatedContent)).toBe(en.intermediary);
    expect((helpcommunicationField.values[10].label as LanguageLookup)(generatedContent)).toBe(en.other);
    expect((helpcommunicationField.values[12].label as LanguageLookup)(generatedContent)).toBe(en.noSupport);

    (helpcommunicationField.validator as Validator)('helpCommunication');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('helpCommunication');
    const describeOtherNeedFieild = helpcommunicationField.values[10].subFields!.describeOtherNeed;
    expect(describeOtherNeedFieild.type).toBe('textarea');
    expect((describeOtherNeedFieild.label as LanguageLookup)(generatedContent)).toBe(en.otherDetails);
    (describeOtherNeedFieild.validator as Validator)('describeOtherNeed');
    expect(isFieldFilledIn).toHaveBeenCalledWith('describeOtherNeed');
    expect(isTextAreaValid).toHaveBeenCalledWith('describeOtherNeed');
    const signLanguageDetailsFieild = helpcommunicationField.values[4].subFields!.signLanguageDetails;
    expect(signLanguageDetailsFieild.type).toBe('textarea');
    expect((signLanguageDetailsFieild.label as LanguageLookup)(generatedContent)).toBe(en.signLanguageDetails);
    (signLanguageDetailsFieild.validator as Validator)('signLanguageDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('signLanguageDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('signLanguageDetails');
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
