import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Language requirements',
  title: 'Do you have any language requirements?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  speakwelsh: 'I need to speak in Welsh',
  readandwritewelsh: 'I need to read and write in Welsh',
  languageinterpreter: 'I need an interpreter in a certain language',
  nointerpreter: 'No, I do not have any language requirements at this time',
  continue: 'Continue',
  errors: {
    languageRequirements: {
      required: 'Please select an answer',
    },
    languageDetails: {
      required: 'Please provide language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Gofynion ieithyddol',
  title: 'A oes gennych chi unrhyw ofynion ieithyddol?',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  speakwelsh: 'Rwyf eisiau siarad Cymraeg',
  readandwritewelsh: 'Rwyf eisiau siarad ac ysgrifennu yn Gymraeg',
  languageinterpreter: 'Mae arnaf angen cyfieithydd mewn iaith benodol',
  nointerpreter: 'Nac oes, nid oes gennyf unrhyw ofynion o ran iaith ar hyn o bryd',
  continue: 'Continue',
  errors: {
    languageRequirements: {
      required: 'Please select an answer',
    },
    languageDetails: {
      required: 'Please provide language details',
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
    expect(generatedContent.title).toEqual('Do you have any language requirements?');
    expect(generatedContent.section).toEqual('Language requirements');
    expect(generatedContent.courtcommunication).toEqual(
      'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.speakwelsh).toEqual('I need to speak in Welsh');
    expect(generatedContent.readandwritewelsh).toEqual('I need to read and write in Welsh');
    expect(generatedContent.languageinterpreter).toEqual('I need an interpreter in a certain language');
    expect(generatedContent.nointerpreter).toEqual('No, I do not have any language requirements at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain languageRequirementsField field', () => {
    const languageRequirementsField = fields.languageRequirements as FormOptions;
    expect(languageRequirementsField.type).toBe('checkboxes');
    expect((languageRequirementsField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
