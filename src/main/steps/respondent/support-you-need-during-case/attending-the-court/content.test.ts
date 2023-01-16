import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
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
  continue: 'Continue',
  errors: {
    respondentAttendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    respondentHearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
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
  continue: 'Continue',
  errors: {
    respondentAttendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    respondentHearingDetails: {
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
    const attendingToCourtField = fields.respondentAttendingToCourt as FormOptions;
    expect(attendingToCourtField.type).toBe('checkboxes');
    expect((attendingToCourtField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
