import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
const en = {
  section: 'Attending the court',
  pagetitle: '',
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
    attendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    hearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  pagetitle: '',
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
    attendingToCourt: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
    hearingDetails: {
      required: 'Explain why you are unable to take part in either video or phone hearings',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    form,
  };
};
