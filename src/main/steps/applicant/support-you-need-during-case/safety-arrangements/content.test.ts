import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Safety requirements',
  title: 'Do you or the children need special safety arrangements at court?',
  courtcommunication:
    'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',
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
  section: 'Gofynion diogelwch',
  title: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
  courtcommunication:
    'Nid oes gan bob llys y cyfleusterau a restrir yma, ac mae’n rhaid i farnwr gytuno i rai, er enghraifft defnyddio sgriniau. Bydd y llys yn cysylltu â chi i drafod y trefniadau diogelwch cyn eich gwrandawiad.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  waitingroom: 'Ystafell aros ar wahân',
  separateexitentry: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screens: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screenshint: 'Mae angen i farnwr gymeradwyo hyn',
  toilet: 'Toiledau ar wahân',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Cyswllt fideo',
  videolinkshint: 'Mae angen i farnwr gymeradwyo hyn',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    safetyArrangements: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    safetyArrangementsDetails: {
      required: 'Disgrifiwch eich anghenion yn fanwl',
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
    expect(generatedContent.title).toEqual('Do you or the children need special safety arrangements at court?');
    expect(generatedContent.section).toEqual('Safety requirements');
    expect(generatedContent.courtcommunication).toEqual(
      'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.'
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

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
