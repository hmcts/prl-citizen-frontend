import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need help communicating and understanding',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needToBeClosedWithSpeaker: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguageInterpreter: 'Sign Language interpreter',
  speechToTextReporter: 'Speech to text reporter (palantypist)',
  needExtraTime: 'Extra time to think and explain myself',
  visitCourtBeforeHearing: 'Visit to court before the hearing',
  explanationOfCourt: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  noSupportRequired: 'No, I do not need any support at this time',
  describeWhatNeeded: 'Describe what you need',
  errors: {
    ra_communicationHelp: {
      required: 'Select what help you need with communicating and understanding',
    },
    ra_signLanguageInterpreter_subfield: {
      required: 'Describe which Sign Language interpreter you need',
    },
    ra_communicationHelpOther_subfield: {
      required: 'Describe what you need to help with communicating and understanding',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need help communicating and understanding - welsh',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  hearingLoop: 'Hearing loop (hearing enhancement system) - welsh',
  infraredReceiver: 'Infrared receiver (hearing enhancement system) - welsh',
  needToBeClosedWithSpeaker: 'Need to be close to who is speaking - welsh',
  lipSpeaker: 'Lip speaker - welsh',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read - welsh',
  signLanguageInterpreter: 'Sign Language interpreter - welsh',
  speechToTextReporter: 'Speech to text reporter (palantypist) - welsh',
  needExtraTime: 'Extra time to think and explain myself - welsh',
  visitCourtBeforeHearing: 'Visit to court before the hearing - welsh',
  explanationOfCourt: "Explanation of the court and who's in the room at the hearing - welsh",
  intermediary: 'Intermediary - welsh',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing - welsh',
  other: 'Other - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    ra_communicationHelp: {
      required: 'Select what help you need with communicating and understanding - welsh',
    },
    ra_signLanguageInterpreter_subfield: {
      required: 'Describe which Sign Language interpreter you need - welsh',
    },
    ra_communicationHelpOther_subfield: {
      required: 'Describe what you need to help with communicating and understanding - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Communication help content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain communicationHelp field', () => {
    const communicationHelpField = fields.ra_communicationHelp as FormOptions;

    expect(communicationHelpField.type).toBe('checkboxes');

    expect((communicationHelpField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((communicationHelpField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.hearingLoop);
    expect((communicationHelpField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.infraredReceiver);
    expect((communicationHelpField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.needToBeClosedWithSpeaker
    );
    expect((communicationHelpField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.lipSpeaker);
    expect((communicationHelpField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.lipSpeakerHint);
    expect((communicationHelpField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.signLanguageInterpreter
    );
    expect((communicationHelpField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.speechToTextReporter);
    expect((communicationHelpField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.needExtraTime);
    expect((communicationHelpField.values[7].label as LanguageLookup)(generatedContent)).toBe(
      en.visitCourtBeforeHearing
    );
    expect((communicationHelpField.values[8].label as LanguageLookup)(generatedContent)).toBe(en.explanationOfCourt);
    expect((communicationHelpField.values[9].label as LanguageLookup)(generatedContent)).toBe(en.intermediary);
    expect((communicationHelpField.values[9].hint as LanguageLookup)(generatedContent)).toBe(en.intermediaryHint);
    expect((communicationHelpField.values[10].label as LanguageLookup)(generatedContent)).toBe(en.other);
    expect(communicationHelpField.values[12].behaviour).toBe('exclusive');
    expect((communicationHelpField.values[12].label as LanguageLookup)(generatedContent)).toBe(en.noSupportRequired);

    (communicationHelpField.validator as Function)('needExtraTime');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('needExtraTime');

    const signLanguageInterpreterDetailsField = communicationHelpField.values[4].subFields
      ?.ra_signLanguageInterpreter_subfield as FormOptions;
    expect(signLanguageInterpreterDetailsField.type).toBe('textarea');
    expect((signLanguageInterpreterDetailsField.label as LanguageLookup)(generatedContent)).toBe(en.describeWhatNeeded);
    (signLanguageInterpreterDetailsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');

    const otherDetailsField = communicationHelpField.values[10].subFields
      ?.ra_communicationHelpOther_subfield as FormOptions;
    expect(otherDetailsField.type).toBe('textarea');
    expect((otherDetailsField.label as LanguageLookup)(generatedContent)).toBe(en.describeWhatNeeded);
    (otherDetailsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
