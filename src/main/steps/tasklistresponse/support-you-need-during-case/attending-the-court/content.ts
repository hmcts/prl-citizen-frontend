import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

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
  line1: 'If your case goes to a hearing, it can take place either: ',
  list1:
    "<li>in person, in a room at a venue ('face-to-face')</li><li>by video (where you can join from a place suitable to you)</li><li>by phone</li>",
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
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: "Dewiswch bob un sy'n berthnasol",
  summaryText: 'Cysylltiadau am gymorth',
  videoHearings: 'Gallaf, rwyf yn gallu cymryd rhan mewn gwrandawiad fideo',
  phoneHearings: 'Gallaf, rwyf yn gallu cymryd rhan mewn gwrandawiad fideo',
  noHearings: 'Na allaf, ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
  noHearingsHint: 'Os dewiswch yr opsiwn hwn, dywedwch wrthym pam rhag ofn y gallwn eich cynorthwyo',
  noHearingDetails: 'Explain why you are unable to take part in video or phone hearings',
  line1: 'If your case goes to a hearing, it can take place either:  -welsh',
  list1:
    "<li>yn bersonol, mewn ystafell mewn lleoliad penodol ('wyneb yn wyneb')</li><li>trwy fideo (lle gallwch chi ymuno o le sy'n addas i chi)</li><li>dros y ffôn</li>",
  continue: 'Continue -welsh',
  errors: {
    attendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing -welsh',
    },
    hearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings -welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    attendingToCourt: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'attendingToCourt',
          label: l => l.videoHearings,
          value: 'videohearings',
        },
        {
          name: 'attendingToCourt',
          label: l => l.phoneHearings,
          value: 'phonehearings',
        },
        {
          divider: true,
        },
        {
          name: 'attendingToCourt',
          label: l => l.noHearings,
          hint: l => l.noHearingsHint,
          value: 'nohearings',
          exclusive: true,
          subFields: {
            hearingDetails: {
              type: 'textarea',
              label: l => l.noHearingDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
