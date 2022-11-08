import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need to bring support with me to a court hearing',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  supportWorkerCarer: 'A support worker or carer',
  supportWorkerCarerSubField: 'Tell us who you will bring',
  friendFamilyMember: 'A friend or family member',
  friendFamilyMemberSubField: 'Tell us who you will bring',
  assistanceGuideDog: 'Assistance / guide dog',
  therapyAnimal: 'Therapy animal',
  therapyAnimalSubField: 'Describe what you need',
  supportCourtOther: 'Other',
  supportCourtOtherSubField: 'Describe what you need',
  supportCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_supportWorkerCarerSubField: {
      required: 'Enter the name of the support worker or carer you will bring',
    },
    ra_friendFamilyMemberSubField: {
      required: 'Enter the name of a friend or family member you will bring',
    },
    ra_therapyAnimalSubField: {
      required: 'Describe which therapy animal you will bring',
    },
    ra_supportCourtOtherSubField: {
      required: 'Describe which support you need to bring with you to a hearing ',
    },
    ra_supportCourt: {
      required: 'Select which support you need to bring with you to a hearing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need to bring support with me to a court hearing - welsh',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  supportWorkerCarer: 'A support worker or carer - welsh',
  supportWorkerCarerSubField: 'Tell us who you will bring - welsh',
  friendFamilyMember: 'A friend or family member - welsh',
  friendFamilyMemberSubField: 'Tell us who you will bring - welsh',
  assistanceGuideDog: 'Assistance / guide dog - welsh',
  therapyAnimal: 'Therapy animal - welsh',
  therapyAnimalSubField: 'Describe what you need - welsh',
  supportCourtOther: 'Other - welsh',
  supportCourtOtherSubField: 'Describe what you need - welsh',
  supportCourtNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    ra_supportWorkerCarerSubField: {
      required: 'Enter the name of the support worker or carer you will bring - welsh',
    },
    ra_friendFamilyMemberSubField: {
      required: 'Enter the name of a friend or family member you will bring - welsh',
    },
    ra_therapyAnimalSubField: {
      required: 'Describe which therapy animal you will bring - welsh',
    },
    ra_supportCourtOtherSubField: {
      required: 'Describe which support you need to bring with you to a hearing - welsh',
    },
    ra_supportCourt: {
      required: 'Select which support you need to bring with you to a hearing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_supportCourt: {
      id: 'ra_supportCourt',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_supportCourt',
          label: l => l.supportWorkerCarer,
          value: 'supportWorkerCarer',
          subFields: {
            ra_supportWorkerCarerSubField: {
              type: 'textarea',
              label: l => l.supportWorkerCarerSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_supportCourt',
          label: l => l.friendFamilyMember,
          value: 'friendFamilyMember',
          subFields: {
            ra_friendFamilyMemberSubField: {
              type: 'textarea',
              label: l => l.friendFamilyMemberSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_supportCourt',
          label: l => l.assistanceGuideDog,
          value: 'assistanceGuideDog',
        },
        {
          name: 'ra_supportCourt',
          label: l => l.therapyAnimal,
          value: 'therapyAnimal',
          subFields: {
            ra_therapyAnimalSubField: {
              type: 'textarea',
              label: l => l.therapyAnimalSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_supportCourt',
          label: l => l.supportCourtOther,
          value: 'supportCourtOther',
          subFields: {
            ra_supportCourtOtherSubField: {
              type: 'textarea',
              label: l => l.supportCourtOtherSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },

        {
          divider: l => l.divider,
        },
        {
          name: 'ra_supportCourt',
          label: l => l.supportCourtNoOption,
          value: 'supportCourtNoOption',
          behaviour: 'exclusive',
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
