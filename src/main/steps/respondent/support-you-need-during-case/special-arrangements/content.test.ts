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
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Trefniadau arbennig',
  title: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau arbennig?',
  courtcommunication:
    "Efallai y bydd angen trefniadau penodol arnoch chi neu'r plant pan fyddwch chi'n dod i'r llys. Rhaid i rai o’r addasiadau hyn gael eu cytuno gan farnwr neu GLlTEM. Os yw eich anghenion yn newid, gallwch drafod hyn gyda'r llys.",
  optionHint: 'Dogfennau mewn lliw penodol',
  waitingRoom: 'Ystafell aros ar wahân',
  separateExitEntry: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screens: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screensHint: 'Mae angen i farnwr gymeradwyo hyn',
  toilet: 'Toiledau ar wahân',
  visitToCourt: "Ymweld â'r llys cyn y gwrandawiad",
  videoLinks: 'Cyswllt fideo',
  videoLinksHint: 'Mae angen i farnwr gymeradwyo hyn',
  other: 'Arall',
  otherDetails: 'Darparwch fanylion am yr hyn rydych chi neu’r plant ei angen',
  noSupport: 'Nac oes, nid oes gennyf unrhyw ofynion o ran diogelwch ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
    const specialArrangementsField = fields.safetyArrangements as FormOptions;
    expect(specialArrangementsField.type).toBe('checkboxes');
    expect((specialArrangementsField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((specialArrangementsField.section as Function)(generatedContent)).toBe(en.section);
    expect((specialArrangementsField.values[0].label as Function)(generatedContent)).toBe(en.waitingRoom);
    expect((specialArrangementsField.values[1].label as Function)(generatedContent)).toBe(en.separateExitEntry);
    expect((specialArrangementsField.values[2].label as Function)(generatedContent)).toBe(en.screens);
    expect((specialArrangementsField.values[2].hint as Function)(generatedContent)).toBe(en.screensHint);
    expect((specialArrangementsField.values[3].label as Function)(generatedContent)).toBe(en.toilet);
    expect((specialArrangementsField.values[4].label as Function)(generatedContent)).toBe(en.visitToCourt);
    expect((specialArrangementsField.values[5].label as Function)(generatedContent)).toBe(en.videoLinks);
    expect((specialArrangementsField.values[5].hint as Function)(generatedContent)).toBe(en.videoLinksHint);
    expect((specialArrangementsField.values[6].label as Function)(generatedContent)).toBe(en.other);
    expect(
      (specialArrangementsField.values[6].subFields?.safetyArrangementsDetails.label as Function)(generatedContent)
    ).toBe(en.otherDetails);
    expect(
      (specialArrangementsField.values[6].subFields?.safetyArrangementsDetails.validator as Function)(generatedContent)
    ).toBe(undefined);
    expect((specialArrangementsField.values[7].divider as Function)(generatedContent)).toBe(undefined);
    expect((specialArrangementsField.values[8].label as Function)(generatedContent)).toBe(en.noSupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
