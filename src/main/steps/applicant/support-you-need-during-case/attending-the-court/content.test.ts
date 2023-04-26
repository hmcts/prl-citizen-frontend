import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Attending the court',
  title: 'Would you be able to take part in hearings by video and phone?',
  hearing: 'If your case goes to a hearing, it can take place either: ',
  inPerson: "in person, in a room at a venue ('face-to-face')",
  byVideo: 'by video (where you can join from a place suitable to you)',
  byPhone: 'by phone',
  combination: 'Some hearings use a combination of these methods. The approach taken will be decided by a judge.',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply',
  summaryText: 'Contacts for help',
  videoHearings: 'Yes, I can take part in video hearings',
  phoneHearings: 'Yes, I can take part in phone hearings',
  noHearings: 'No, I cannot take part in either video or phone hearings',
  noHearingsHint: 'If you choose this option please tell us why in case we can assist you',
  noHearingDetails: 'Explain why you are unable to take part in video or phone hearings',
  continue: 'Continue',
  errors: {
    attendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    hearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings',
    },
  },
};

const cy: typeof en = {
  section: 'Mynychu’r llys',
  title: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
  hearing: 'If your case goes to a hearing, it can take place either: (welsh)',
  inPerson: "in person, in a room at a venue ('face-to-face') (welsh)",
  byVideo: 'by video (where you can join from a place suitable to you) (welsh)',
  byPhone: 'by phone (welsh)',
  combination:
    'Some hearings use a combination of these methods. The approach taken will be decided by a judge. (welsh)',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: "Dewiswch bob un sy'n berthnasol",
  summaryText: 'Cysylltiadau am gymorth',
  videoHearings: 'Gallaf, rwyf yn gallu cymryd rhan mewn gwrandawiad fideo',
  phoneHearings: 'Gallaf, rwyf yn gallu cymryd rhan mewn gwrandawiad fideo',
  noHearings: 'Na allaf, ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
  noHearingsHint: 'Os dewiswch yr opsiwn hwn, dywedwch wrthym pam rhag ofn y gallwn eich cynorthwyo',
  noHearingDetails: 'Explain why you are unable to take part in video or phone hearings',
  continue: 'Continue',
  errors: {
    attendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    hearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings',
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
    expect(generatedContent.hearing).toEqual('If your case goes to a hearing, it can take place either: ');
    expect(generatedContent.inPerson).toEqual("in person, in a room at a venue ('face-to-face')");
    expect(generatedContent.byVideo).toEqual('by video (where you can join from a place suitable to you)');
    expect(generatedContent.byPhone).toEqual('by phone');
    expect(generatedContent.combination).toEqual(
      'Some hearings use a combination of these methods. The approach taken will be decided by a judge.'
    );
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
    expect((attendingToCourtField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((attendingToCourtField.values[0].label as Function)(generatedContent)).toBe(en.videoHearings);
    expect(attendingToCourtField.values[0].value).toBe('videohearings');
    expect((attendingToCourtField.values[1].label as Function)(generatedContent)).toBe(en.phoneHearings);
    expect(attendingToCourtField.values[1].value).toBe('phonehearings');
    expect((attendingToCourtField.values[3].label as Function)(generatedContent)).toBe(en.noHearings);
    expect((attendingToCourtField.values[3].hint as Function)(generatedContent)).toBe(en.noHearingsHint);
    expect(attendingToCourtField.values[3].value).toBe('nohearings');
    expect((attendingToCourtField.values[3].subFields?.hearingDetails.label as Function)(generatedContent)).toBe(
      en.noHearingDetails
    );
    (attendingToCourtField.values[3].subFields?.hearingDetails.validator as Validator)('test value');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test value');
    expect(attendingToCourtField.values[3].subFields?.hearingDetails.type).toBe('textarea');
    expect(attendingToCourtField.validator).toBe(atLeastOneFieldIsChecked);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
