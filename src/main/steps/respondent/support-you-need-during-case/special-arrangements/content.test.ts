import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Special arrangements',
  title: 'Do you or the children need special arrangements at court?',
  courtcommunication:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingRoom: 'Separate waiting room',
  separateExitEntry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screensHint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  visitToCourt: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Provide details of what you or the children need',
  noSupport: 'No, I do not have any safety requirements at this time',
  continue: 'Continue',
  errors: {
    respondentSpecialArrangements: {
      required: 'Please select an answer',
    },
    respondentSpecialArrangementsDetails: {
      required: 'Please describe your need in detail',
    },
  },
};

const cy: typeof en = {
  section: 'Special arrangements',
  title: 'Do you or the children need special arrangements at court?',
  courtcommunication:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingRoom: 'Separate waiting room',
  separateExitEntry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screensHint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  visitToCourt: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Provide details of what you or the children need',
  noSupport: 'No, I do not have any safety requirements at this time',
  continue: 'Continue',
  errors: {
    respondentSpecialArrangements: {
      required: 'Please select an answer',
    },
    respondentSpecialArrangementsDetails: {
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
    expect(generatedContent.title).toEqual('Do you or the children need special arrangements at court?');
    expect(generatedContent.section).toEqual('Special arrangements');
    expect(generatedContent.courtcommunication).toEqual(
      'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.waitingRoom).toEqual('Separate waiting room');
    expect(generatedContent.separateExitEntry).toEqual('Separate exits and entrances');
    expect(generatedContent.screens).toEqual('Screens so you and the other people in the case cannot see each other');
    expect(generatedContent.toilet).toEqual('Separate toilets');
    expect(generatedContent.visitToCourt).toEqual('Visit to court before the hearing');
    expect(generatedContent.videoLinks).toEqual('Video links');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.noSupport).toEqual('No, I do not have any safety requirements at this time');
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
    const specialArrangementsField = fields.respondentSpecialArrangements as FormOptions;
    expect(specialArrangementsField.type).toBe('checkboxes');
    expect((specialArrangementsField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
