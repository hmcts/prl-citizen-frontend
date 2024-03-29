import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the hearing',
  courthearing: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    signLanguageDetails: {
      required: 'Please describe sign language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  hearingloop: 'Dolen sain (system gwella clyw)',
  infraredreceiver: 'Derbynnydd isgoch (system gwella clyw)',
  needspeakinghelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
  lipspeaker: 'Siaradwr gwefusau',
  lipspeakerhint: 'clywed rhywun sydd wedi cael ei hyfforddi i allu darllen gwefusau yn rhwydd',
  signlanguage: 'Cyfieithydd iaith arwyddion',
  signLanguageDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  speechreporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
  extratime: 'Amser ychwanegol i feddwl ac egluro fy hun',
  courtvisit: "Ymweld â'r llys cyn y gwrandawiad",
  courthearing: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
  intermediary: 'Cyfryngwr',
  intermediaryhint:
    'rhywun i’ch helpu os oes gennych anghenion cyfathrebu drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    helpCommunication: {
      required: 'Dewiswch pa gymorth sydd ei angen arnoch wrth gyfathrebu a deall',
    },
    describeOtherNeed: {
      required: 'Rhowch fanylion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    signLanguageDetails: {
      required: 'Rhowch fanylion yr iaith arwyddion',
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
    expect(generatedContent.courtcommunication).toEqual(
      'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.hearingloop).toEqual('Hearing loop (hearing enhancement system)');
    expect(generatedContent.infraredreceiver).toEqual('Infrared receiver (hearing enhancement system)');
    expect(generatedContent.needspeakinghelp).toEqual('Need to be close to who is speaking');
    expect(generatedContent.lipspeaker).toEqual('Lip speaker');
    expect(generatedContent.lipspeakerhint).toEqual('hearing person who has been trained to be easily lip read');
    expect(generatedContent.signlanguage).toEqual('Sign Language interpreter');
    expect(generatedContent.speechreporter).toEqual('Speech to text reporter (palantypist)');
    expect(generatedContent.extratime).toEqual('Extra time to think and explain myself');
    expect(generatedContent.courtvisit).toEqual('Visit to court before the hearing');
    expect(generatedContent.courthearing).toEqual("Explanation of the court and who's in the room at the hearing");
    expect(generatedContent.intermediary).toEqual('Intermediary');
    expect(generatedContent.intermediaryhint).toEqual(
      'a person to help you if you have communication needs by providing professional support to participate in a hearing'
    );
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

  test('should contain helpcommunication field', () => {
    const helpcommunicationField = fields.helpCommunication as FormOptions;
    expect(helpcommunicationField.type).toBe('checkboxes');
    expect((helpcommunicationField.section as Function)(generatedContent)).toBe(en.section);

    expect((helpcommunicationField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((helpcommunicationField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.hearingloop);
    expect((helpcommunicationField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.infraredreceiver);
    expect((helpcommunicationField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.needspeakinghelp);
    expect((helpcommunicationField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.lipspeakerhint);
    expect((helpcommunicationField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.lipspeaker);
    expect((helpcommunicationField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.signlanguage);
    expect((helpcommunicationField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.speechreporter);
    expect((helpcommunicationField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.extratime);
    expect((helpcommunicationField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.courtvisit);
    expect((helpcommunicationField.values[8].label as LanguageLookup)(generatedContent)).toBe(en.courthearing);
    expect((helpcommunicationField.values[9].hint as LanguageLookup)(generatedContent)).toBe(en.intermediaryhint);
    expect((helpcommunicationField.values[9].label as LanguageLookup)(generatedContent)).toBe(en.intermediary);
    expect((helpcommunicationField.values[10].label as LanguageLookup)(generatedContent)).toBe(en.other);
    expect((helpcommunicationField.values[12].label as LanguageLookup)(generatedContent)).toBe(en.nosupport);

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
