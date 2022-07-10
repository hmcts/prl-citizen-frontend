import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Safety requirements',
  title: 'Do you or the children need special safety arrangements at court?',
  courtcommunication: 'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingroom: 'Separate waiting room',
  separateexitentry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screenshint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Video links',
  videolinkshint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
    },
  },
};

const cy: typeof en = {
  section: 'Safety requirements',
  title: 'Do you or the children need special safety arrangements at court?',
  courtcommunication: 'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingroom: 'Separate waiting room',
  separateexitentry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screenshint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Video links',
  videolinkshint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
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
    expect(generatedContent.title).toEqual('Do you or the children need special safety arrangements at court?');
    expect(generatedContent.section).toEqual('Safety requirements');
    expect(generatedContent.courtcommunication).toEqual(
      'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',

    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.waitingroom).toEqual('Separate waiting room');
    expect(generatedContent.separateexitentry).toEqual('Separate exits and entrances');
    expect(generatedContent.screens).toEqual('Screens so you and the other people in the case cannot see each other');
    expect(generatedContent.toilet).toEqual('Separate toilets');
    expect(generatedContent.advancedview).toEqual('Advanced viewing of the court');
    expect(generatedContent.videolinks).toEqual('Video links');
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
    const safetyArrangementsField = fields.safetyArrangements as FormOptions;
    expect(safetyArrangementsField.type).toBe('checkboxes');
    expect((safetyArrangementsField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
