import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Attending the court',
  title: 'Would you be able to take part in hearings by video and phone?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply',
  summaryText: 'Contacts for help',
  videoHearings: 'Yes, I can take part in video hearings',
  phoneHearings: 'Yes, I can take part in phone hearings',
  noHearings: 'No, I cannot take part in either video or phone hearings',
  noHearingsHint: 'If you choose this option please tell us why in case we can assist you',
  noHearingDetails: 'Explain why you are unable to take part in video or phone hearings',
  line1: 'If your case goes to a hearing, it can take place either: ',
  list1:
    "<li>in person, in a room at a venue ('face-to-face')</li><li>by video (where you can join from a place suitable to you)</li><li>by phone</li>",
  line2: 'Some hearings use a combination of these methods. The approach taken will be decided by a judge.',
  continue: 'Continue',
  errors: {
    attendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    hearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Mynychu’r llys',
  title: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: "Dewiswch bob un sy'n berthnasol",
  summaryText: 'Cysylltiadau am gymorth',
  videoHearings: 'Gallaf, rwyf yn gallu cymryd rhan mewn gwrandawiad fideo',
  phoneHearings: 'Gallaf, rwyf yn gallu cymryd rhan mewn gwrandawiad fideo',
  noHearings: 'Na allaf, ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
  noHearingsHint: 'Os dewiswch yr opsiwn hwn, dywedwch wrthym pam rhag ofn y gallwn eich cynorthwyo',
  noHearingDetails:
    'Esboniwch pam nad ydych yn gallu cymryd rhan mewn gwrandawiad drwy fideo na gwrandawiad dros y ffôn',
  line1: 'Os bydd eich achos yn mynd i wrandawiad, gellir ei gynnal naill ai:',
  list1:
    "<li>yn bersonol, mewn ystafell mewn lleoliad penodol ('wyneb yn wyneb')</li><li>trwy fideo (lle gallwch chi ymuno o le sy'n addas i chi)</li><li>dros y ffôn</li>",
  line2:
    "Mae rhai gwrandawiadau yn defnyddio cyfuniad o'r dulliau hyn. Barnwr fydd yn penderfynu pa ddull fydd yn cael ei ddefnyddio.",
  continue: 'Parhau',
  errors: {
    attendingToCourt: {
      required: 'Dewiswch a allwch chi gymryd rhan mewn gwrandawiad fideo neu wrandawiad dros y ffôn ',
    },
    hearingDetails: {
      required: 'Eglurwch pam na allwch gymryd rhan mewn naill ai gwrandawiadau fideo neu wrandawiadau dros y ffôn',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
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
    expect(generatedContent.title).toEqual('Would you be able to take part in hearings by video and phone?');
    expect(generatedContent.section).toEqual('Attending the court');
    expect(generatedContent.optionHint).toEqual('Select all that apply');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.videoHearings).toEqual('Yes, I can take part in video hearings');
    expect(generatedContent.phoneHearings).toEqual('Yes, I can take part in phone hearings');
    expect(generatedContent.noHearings).toEqual('No, I cannot take part in either video or phone hearings');
    expect(generatedContent.noHearingsHint).toEqual(
      'If you choose this option please tell us why in case we can assist you'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Attending the court field', () => {
    const attendingToCourtField = fields.attendingToCourt as FormOptions;
    expect(attendingToCourtField.type).toBe('checkboxes');
    expect((attendingToCourtField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });

  test('should contain attendingToCourt field', () => {
    const attendingToCourt = fields.attendingToCourt as FormOptions;
    expect(attendingToCourt.type).toBe('checkboxes');
    expect((attendingToCourt.section as Function)(generatedContent)).toBe(en.section);
    expect((attendingToCourt.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((attendingToCourt.values[0].label as LanguageLookup)(generatedContent)).toBe(en.videoHearings);
    expect((attendingToCourt.values[1].label as LanguageLookup)(generatedContent)).toBe(en.phoneHearings);
    expect((attendingToCourt.values[3].label as LanguageLookup)(generatedContent)).toBe(en.noHearings);
    expect((attendingToCourt.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.noHearingsHint);
    (attendingToCourt.validator as Validator)('attendingToCourt');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('attendingToCourt');
    const hearingDetailsFlieild = attendingToCourt.values[3].subFields!.hearingDetails;
    expect(hearingDetailsFlieild.type).toBe('textarea');
    expect((hearingDetailsFlieild.label as LanguageLookup)(generatedContent)).toBe(en.noHearingDetails);
    (hearingDetailsFlieild.validator as Validator)('hearingDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('hearingDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('hearingDetails');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
