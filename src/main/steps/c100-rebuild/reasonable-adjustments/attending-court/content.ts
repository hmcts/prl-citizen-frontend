import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Attending the court',
  headingTitle: `Would you be able to take 
  part in hearings by video and phone?`,
  paragraph1: 'If your case goes to a hearing, it can take place either:',
  paragraph2: `Some hearings use a combination of these methods. 
  The approach taken will be decided by a judge.`,
  line1: "in person, in a room at a venue ('face-to-face')",
  line2: 'by video (where you can join from a place suitable to you)',
  line3: 'by phone',
  select_all_apply: 'Select all that apply',
  videoHearing: 'Yes, I can take part in video hearings',
  phoneHearing: 'Yes, I can take part in phone hearings',
  noVideoAndPhoneHearing: 'No, I cannot take part in either video or phone hearings',
  noVideoAndPhoneHearingReason: 'If you choose this option please tell us why in case we can assist you',
  noVideoAndPhoneHearing_subfield: 'Explain why you are unable to take part in video or phone hearings',
  errors: {
    ra_noVideoAndPhoneHearing_subfield: {
      required: 'Explain why you are unable to take part in neither video or phone hearings',
    },
    ra_typeOfHearing: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Attending the court - welsh',
  headingTitle: `Would you be able to take 
  part in hearings by video and phone? - welsh`,
  paragraph1: 'If your case goes to a hearing, it can take place either: - welsh',
  paragraph2: `Some hearings use a combination of these methods. 
  The approach taken will be decided by a judge. - welsh`,
  line1: "in person, in a room at a venue ('face-to-face') - welsh",
  line2: 'by video (where you can join from a place suitable to you) - welsh',
  line3: 'by phone - welsh',
  select_all_apply: 'Select all that apply - welsh',
  videoHearing: 'Yes, I can take part in video hearings - welsh',
  phoneHearing: 'Yes, I can take part in phone hearings - welsh',
  noVideoAndPhoneHearing: 'No, I cannot take part in either video or phone hearings - welsh',
  noVideoAndPhoneHearingReason: 'If you choose this option please tell us why in case we can assist you - welsh',
  noVideoAndPhoneHearing_subfield: 'Explain why you are unable to take part in video or phone hearings - welsh',
  errors: {
    ra_noVideoAndPhoneHearing_subfield: {
      required: 'Explain why you are unable to take part in neither video or phone hearings - welsh',
    },
    ra_typeOfHearing: {
      required: 'Select whether you can take part in a video or phone hearing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_typeOfHearing: {
      id: 'ra_typeOfHearing',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_typeOfHearing',
          label: l => l.videoHearing,
          value: 'videoHearing',
        },
        {
          name: 'ra_typeOfHearing',
          label: l => l.phoneHearing,
          value: 'phoneHearing',
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'ra_typeOfHearing',
          label: l => l.noVideoAndPhoneHearing,
          value: 'noVideoAndPhoneHearing',
          hint: l => l.noVideoAndPhoneHearingReason,
          behaviour: 'exclusive',
          subFields: {
            ra_noVideoAndPhoneHearing_subfield: {
              type: 'textarea',
              label: l => l.noVideoAndPhoneHearing_subfield,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
